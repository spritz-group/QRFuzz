import json
import os

qr_files = []

# ---------------- FILE HANDLER ----------------

class FileHandler():
    def __init__(self, json_path = "../QRCodeFuzzer/data"):
        self.fuzzer = []
        self.iterator = 0
        self.json_file = ""
        self.__jsonPathChecker(json_path)
        self.initialize()
        
    
    def __jsonPathChecker(self, json_path):
        if json_path and json_path[-1] == '/':
            json_path = json_path[:-1]

        if os.path.isfile(json_path + "/fuzzer.json") and os.access(json_path + "/fuzzer.json", os.R_OK):
            self.json_file = json_path + "/fuzzer.json"
        else:
            print("[QRCodeGenerator] Error, the file path for the JSON file does not exists or cannot be read.")
            exit(1)


    def next(self):
        if not self.hasNotNext():
            self.iterator += 1

    def hasNotNext(self):
        return len(qr_files) <= self.iterator
        
    def currentFilename(self):
        return qr_files[self.iterator]

    def initialize(self):
        # Initialize JSON file
        fuzzer = {}
        fuzzer["status"] = 0
        fuzzer["file"] = "Starting"
        fuzzer["size"] = len(qr_files)
        f = open(self.json_file, 'w', encoding='utf-8')
        json.dump(fuzzer, f, ensure_ascii=False, indent=4)
        f.close()
        self.fuzzer = fuzzer

    def checker(self):

        # Read JSON file
        f = open(self.json_file, 'r', encoding='utf-8')
        string = f.read()
        try: 
            # Decode from JSON
            fuzzer = json.loads(string)

            if fuzzer["status"] == 1 & fuzzer["status"] != self.fuzzer["status"]:

                # Set "status" back to 0 and update file name
                fuzzer["status"] = 0
                fuzzer["file"] = qr_files[self.iterator]

                # Update JSON file
                f = open(self.json_file, 'w', encoding='utf-8')
                json.dump(fuzzer, f, ensure_ascii=False, indent=4)
                f.close()

                # Update value
                self.fuzzer = fuzzer
                print("> Ok:", qr_files[self.iterator])

                return True
        except:
            # JSON decoding throws some errors, but then works, dunno why
            pass

        return False
        