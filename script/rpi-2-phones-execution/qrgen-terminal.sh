#!/bin/bash

## QRGen Terminal Script 

# 1) get a list of all apps
# 2) get argument with the working folder path
# 3) execute sequentially all the apps invoking the command for the visualizer (remember 10 seconds cooldown for the last one and then exit!)
## follow this https://github.com/Maxelweb/FuzzQRTestingUNIPD/issues/7


# CHANGE THIS IF NEEDED
fuzzqrdir="../../QRCodeGenerator"


# Do not edit under here

function echoerr {
    echo -e "\e[31m$1\e[39m"
}

function echosuc {
    echo -e "\e[32m$1\e[39m"
}

timestamp=$(date +%s)

function echolog {
    printf '[%s] %s\n' "$(date +%F_%H-%M-%S)" "$1" >> log-qrgen-terminal-"$timestamp".txt
}


echosuc "[ QRGEN Terminal Script ]"
echo "[?] Checking script arguments"

if [ -z "$1" ] || [ -z "$2" ] 
then
    echoerr "[ERROR] No arguments supplied, please provide: "
    echoerr "<arg1> a position {left, right, center} for the QR Visualizer Window"
    echoerr "<arg2> a txt file path with list of apps in each line"
    exit 1
fi

case "$1" in
  left|right|center)
    echosuc "The window will be positioned on the: $1"
    ;;
  *)
    echoerr "Please, the argument must be {left, right, center}"
    exit 1
esac

filename="$2"
IFS=$'\n' read -d '' -r -a app < "$filename"

echosuc "[OK] ${#app[@]} apps loaded:"
echosuc "${app[*]}"

echo "[?] Executing the qr gen sequentially"
echo "[?] Be aware that after the end of each script, the QrGen sleeps for 10 seconds"

echolog "QRGen Terminal Script started"
echolog "-- CONFIGURATION"
echolog "Position of the window: $1"
echolog "Number of apps loaded: ${#app[@]}"
echolog "List of apps loaded: ${app[*]}"
echolog "-- EXECUTION"

for i in "${app[@]}"
do
    echolog "Current analysis: $i"
	echosuc "----------- NOW EXECUTING $i -------------"
    dir="$fuzzqrdir/data-tests/$i"
    if [[ ! -e $dir ]]; then
        mkdir "$dir"
        mkdir "$dir/screen"
        mkdir "$dir/logs"
        touch "$dir/fuzzer.json"
        touch "$dir/qrcodes-error.txt"
        echolog "Folder exists: No, just created at $dir"
        echosuc "[OK] Creating folders and files because $dir did not existed"
    else 
        echolog "Folder exists: Yes, at $dir"
        echosuc "[?] Folder $dir already exists"
    fi
    echolog "Python script START for $i"
    echo "[?] Starting python script..."
    python "$fuzzqrdir"/main.py -a "$i" -j "$dir" -p "$1"
    echosuc "----------- END $i -------------"
    echo "[?] Sleeping for 10s"
    echolog "Python script FINISH for $i"
    sleep 1
done

echolog "QRGen Terminal Script exited"
