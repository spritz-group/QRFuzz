import sys
from qr_gen import *
from PIL import ImageTk, Image
import argparse
import qrcode
import tkinter as tk

from file_handler import FileHandler, qr_files, payloads

# --------------------- CONFIG ---------------------

update_time = 500

# --------------------------------------------------

def cmd():
    """ Argument parser """
    parser = argparse.ArgumentParser(
        prog="QR Code Generator",
        description="QR Code Generator used in QRFuzz. Generate and Display QR Code.",
        usage=f"main.py -a <app_name> -l <number>\nPayload lists: \n {fuzz_type}"
    )
    sgroup = parser.add_argument_group("Options available")
    sgroup.add_argument(
        "--list",
        "-l",
        type=int,
        help="Set the dictionary to use. ",
        choices=[i[0] for i in fuzz_type],
    ) 
    sgroup.add_argument(
        "--app",
        "-a",
        type=str,
        help="Set app to use",
        choices=app_names.keys(),
    )
    sgroup.add_argument(
        "--jsonpath",
        "-j",
        type=str,
        help="Set path to json file to use (the json file must be named 'fuzzer.json')"
    )
    sgroup.add_argument(
        "--position",
        "-p",
        type=str,
        help="Set position of the window in the screen",
        choices=("left", "right", "center")
    )
    sgroup.add_argument(
        "--start-from",
        "-sf",
        type=int,
        help="Start QR Code scan from the given position"
    )
    sgroup.add_argument(
        "--standard",
        "-st",
        action='store_true',
        help="Use standard QR builder with no customization"
    )
    opt = parser.parse_args()
    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)
    return opt

# --------------------- MAIN ---------------------
def main():   
    
    # Check and Load arguments
    opt = cmd()
    
    app_index = opt.app # name of the app
    list_index = opt.list # list of qr codes
    standard_option = opt.standard # generate standard payload for qr codes with no customization

    if app_index is None: 
        print("[QRCodeGenerator] Please select an app with the argument -a")
        exit(1)
    
    print(app_index)

    # App function callback
    app_fun = app_names["standard"] if standard_option else app_names[app_index]

    # Set index of the test
    if list_index is not None:
        dicts = [word_files[list_index]]
        name = word_file_names[list_index]
    else:
        dicts = word_files
        name = "all"

    # Read words and load variables "qr_files" and "payloads"
    for dd in dicts:
        f = open(dd, encoding='utf-8')

        for i, s in enumerate(f.readlines()):
            if name != "all":
                qr_files.append(name + "-" + str(i))
            else:
                qr_files.append(dd.replace("words/","").replace(".txt", "") + "-" + str(i))
            payloads.append(s)
            i += 1

    # Set Json path     
    if opt.jsonpath:
        file = FileHandler(opt.jsonpath)
    else:
        file = FileHandler()

    # Set starting position
    if opt.start_from:
        file.iterator = opt.start_from

    # ------------------------------------

    def genqr(text="test"):
        """ Generate QR Code using text """
        try:
            qr = qrcode.QRCode(
                error_correction=qrcode.constants.ERROR_CORRECT_L,
            )
            qr.add_data(text)
            qr.make(fit=True)

            img = qr.make_image(fill_color="black", back_color="white")
            print("> Text:", text)
        except Exception as e:
            img = qrcode.make("Error")
            print("> Text:", "Error")
        
        return img

        
    # TK window generation to visualize QR Code
    window = tk.Tk()
    window.title("QR Code Visualizer - QRFuzz")
    window_height = 800
    window_width = 800
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    y_cordinate = int((screen_height/2) - (window_height/2))

    # Set TK position
    if opt.position == "left":
        x_cordinate = int(50)
    elif opt.position == "right":
        x_cordinate = int((screen_width/2) + 100)
    else:
        x_cordinate = int((screen_width/2) - (window_width/2))
    window.geometry("{}x{}+{}+{}".format(window_width, window_height, x_cordinate, y_cordinate))
    window.configure(background='white')

    # Generate sample image
    global img 
    img = genqr("test")
    ph = ImageTk.PhotoImage(img)
    label = tk.Label(window, image=ph)

    def update():
        """ Function callback to generate next image in the Visualizer """
        if file.checker():
            gp = app_fun(payloads[file.iterator])
            img = genqr(gp)
            new_width = label.winfo_width()
            new_height = label.winfo_height()
            image = img.resize((new_width, new_height))
            photo = ImageTk.PhotoImage(image)
            label.config(image = photo)
            label.image = photo 
            # Important to reset colors if the string contains bash colors
            print("> Current iterator position: " + str(file.iterator) + " \033[0m")
            file.next()
            window.after(update_time, update)
        else:
            if file.hasNotNext():
                print("End of QR codes, closing in 10 seconds...")
                window.after(10000, close)
            else:
                window.after(update_time, update)
            

    def close():
        """ Function callback to close the program """
        print("Done")
        window.destroy()
    
    def resize_image(e):
        """ Function callback to resize the image in the visualizer """
        new_width = e.width
        new_height = e.height
        image = img.resize((new_width, new_height))
        photo = ImageTk.PhotoImage(image)
        label.config(image = photo)
        label.image = photo # avoid garbage collection
        

    # Start Main Loop
    label.bind('<Configure>', resize_image)
    label.pack(fill=tk.BOTH, expand = tk.YES)
    window.after(update_time, update)
    window.mainloop()

if __name__ == "__main__":
    main()