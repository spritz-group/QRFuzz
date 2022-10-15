#!/bin/bash

## QRGen Terminal Script (Single execution)

# 1) get a list of all apps
# 2) get argument with the working folder path
# 3) execute sequentially all the apps invoking the command for the visualizer (remember 10 seconds cooldown for the last one and then exit!)
## follow this https://github.com/Maxelweb/FuzzQRTestingUNIPD/issues/7


# CHANGE THIS IF NEEDED
qrgendir=$(realpath ../../fuzzqr/QRCodeGenerator)
qrfuzzdir=$(realpath ../../fuzzqr/QRCodeFuzzer)


# Do not edit under here

function echoerr {
    echo -e "\e[31m$1\e[39m"
}

function echosuc {
    echo -e "\e[32m$1\e[39m"
}

timestamp=$(date +%s)

function echolog {
    printf '[%s] %s\n' "$(date +%F_%H-%M-%S)" "$1" >> log-qrgen-terminal-single-"$timestamp".txt
}


echosuc "[ QRGEN Terminal Script ]"
echo "[?] Checking script arguments"

if [ -z "$1" ] || [ -z "$2" ] 
then
    echoerr "[ERROR] No arguments supplied, please provide: "
    echoerr "<arg1> a position {left, right, center} for the QR Visualizer Window"
    echoerr "<arg2> a name of the app to test"
    echoerr "[OPTIONAL] <arg3> a position number to start from (default: 0)"
    echoerr "[OPTIONAL] <arg4> enable standard QR code generation (default: disabled)"
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

if [ -z "$3" ]
then
    start=0
else
    start="$3"
fi

if [ -z "$4" ]
then
    standard=""
else
    standard="standard"
fi

echosuc "[OK] 1 app loaded:"
echosuc "$2"

echo "[?] Executing the qr gen single app"

echolog "QRGen Terminal Script started"
echolog "-- CONFIGURATION"
echolog "Position of the window: $1"
echolog "App loaded: $2"
echolog "Starting QR from: $3"
echolog "Extra parameters: $4"
echolog "-- EXECUTION"

i="$2"
echolog "Current analysis: $i"
echosuc "----------- NOW EXECUTING $i -------------"
dir="$qrfuzzdir/data-tests/$i"
if [[ ! -e $dir ]]; then
    mkdir "$dir"
    mkdir "$dir/screen"
    mkdir "$dir/logs"
    touch "$dir/fuzzer.json"
    touch "$dir/qrcodes-logs.csv"
    touch "$dir/qrcodes-payloads.txt"
    echolog "Folder exists: No, just created at $dir"
    echosuc "[OK] Creating folders and files because $dir did not existed"
else 
    echolog "Folder exists: Yes, at $dir"
    echosuc "[?] Folder $dir already exists"
fi
echolog "Python script START for $i"
echo "[?] Starting python script..."
python "$qrgendir"/main.py -a "$i" -j "$dir" -p "$1" -sf "$start" "$standard"
echosuc "----------- END $i -------------"
echo "[?] Sleeping for 10s"
echolog "Python script FINISH for $i"
sleep 5

echolog "QRGen Terminal Script exited"
