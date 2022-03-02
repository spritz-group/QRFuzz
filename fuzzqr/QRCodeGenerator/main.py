#
# Display for FakeGreenPass generation
# --------------------

from qrgen import *
from passgen import *

import sys
import argparse
import pyqrcode
import tkinter as tk

from file_handler import *

# --------------------- CONFIG ---------------------

_qr_error = 'L'
_qr_scale = 7
update_time = 500


# --------------------- MAIN ---------------------
def main():   
    
    opt = cmd()
    payloads = []
    
    app_index = opt.app
    list_index = opt.list

    if app_index is None or list_index is None: 
        exit(1)
    
    f = open(lists[list_index])

    for i, s in enumerate(open(f, encoding='utf-8').readlines()):
        qr_files.append(fuzz_type[list_index] + "-" + str(i))
        payloads.append(s)
        i += 1

    file = FileHandler()

    def genqr(text="test"):
        qrcode = pyqrcode.create(text, error=_qr_error)
        return tk.BitmapImage(data = qrcode.xbm(scale=_qr_scale))

    def editpayload():
        msg = get_cose(get_pass(payloads[file.iterator]))
        msg = add_cose_key(msg, PRIVKEY)
        msg = flynn(msg.encode(), HEADER)
        msg = b45(msg)
        msg = b"HC1:" + msg
        print("RAW Certificate: ", msg)
        print("-"*20)
        return msg

    def update():
        # ---------- main loop -----------
        if file.checker():
            gp = editpayload()
            img2 = genqr(gp)
            panel.config(image=img2)
            panel.image = img2 #IPER MEGA IMPORTANT
            file.next()
            window.after(update_time, update)
        else:
            if file.hasNotNext():
                print("End of QR codes, closing in 10 seconds...")
                window.after(10000, close)
            else:
                window.after(update_time, update)
            

    def close():
        print("Done")
        window.destroy()
        

    # ----------- TK -----------
    window = tk.Tk()
    window.title("QR Code Visualizer")
    window.geometry("800x800")
    window.configure(background='white')

    img = genqr("test")
    panel = tk.Label(window, image = img)
    panel.pack(side = "bottom", fill = "both", expand = "yes")

    window.after(update_time, update)
    window.mainloop()


# --------------------- CMD ---------------------

def cmd():
    parser = argparse.ArgumentParser(
        description="Generate and Display QR Code while scanning with Appium-controlled app",
        usage=f"main-display.py -l [number]\nusage: main-display.py -w [/path/to/custom/wordlist]\n\nPayload lists: \n {fuzz_type}"
    )
    sgroup = parser.add_argument_group("Options available")
    sgroup.add_argument(
        "--list",
        "-l",
        type=int,
        help="Set wordlist to use",
        choices=fuzz_type.keys(),
    ) 
    sgroup.add_argument(
        "--app",
        "-a",
        type=int,
        help="Set app to use",
        choices=app_name.values(),
    )
    opt = parser.parse_args()
    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)
    return opt


if __name__ == "__main__":
    main()