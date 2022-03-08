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

    if app_index is None: 
        exit(1)
    app_fun = app_names[app_index]
    
    print(app_index)
    if list_index is not None:
        dicts = [word_files[list_index]]
        name = word_file_names[list_index]
    else:
        dicts = word_files
        name = "all"
    
    for dd in dicts:
        f = open(dd, encoding='utf-8')

        for i, s in enumerate(f.readlines()):
            qr_files.append(name + "-" + str(i))
            payloads.append(s)
            i += 1

        file = FileHandler()

    def genqr(text="test"):
        print("> Text:", text)
        qrcode = pyqrcode.create(text, error=_qr_error)
        return tk.BitmapImage(data = qrcode.xbm(scale=_qr_scale))

    # def editpayload():
    #     msg = get_cose(get_pass(payloads[file.iterator]))
    #     msg = add_cose_key(msg, PRIVKEY)
    #     msg = flynn(msg.encode(), HEADER)
    #     msg = b45(msg)
    #     msg = b"HC1:" + msg
    #     print("RAW Certificate: ", msg)
    #     print("-"*20)
    #     return msg

    def update():
        # ---------- main loop -----------
        if file.checker():
            gp = app_fun(payloads[file.iterator])
            img2 = genqr(gp)

            panel.config(image= img2)
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
        choices=[i[0] for i in fuzz_type],
    ) 
    sgroup.add_argument(
        "--app",
        "-a",
        type=str,
        help="Set app to use",
        choices=app_names.keys(),
    )
    opt = parser.parse_args()
    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)
    return opt


if __name__ == "__main__":
    main()