#!/bin/bash

## Appium Terminal Script (Single execution)

# 1) get a list of all apps
# 2) get argument with the port of appium server and working folder path
# 3) execute sequentially all the apps invoking the command for the client (remember to create a sleep of 15 seconds after closing the client instance)


# CHANGE THIS IF NEEDED
qrfuzzdir=$(realpath ../../tools/QRCodeFuzzer)


# Do not edit under here

function echoerr {
    echo -e "\e[31m$1\e[39m"
}

function echosuc {
    echo -e "\e[32m$1\e[39m"
}

timestamp=$(date +%s)

function echolog {
    printf '[%s] %s\n' "$(date +%F_%H-%M-%S)" "$1" >> log-appium-terminal-single-"$timestamp".txt
}


echosuc "[ APPIUM Terminal Script ]"
echo "[?] Checking script arguments"

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]
then
    echoerr "[ERROR] No arguments supplied, please provide: "
    echoerr "<arg1> the port number of the appium server"
    echoerr "<arg2> the device id from <adb devices>"
    echoerr "<arg3> a name of the app to test"
    echoerr "[OPTIONAL] <arg4> a position number to start from (default: 0)"
    echoerr "[OPTIONAL] <arg5> telegram command to send notification (default: disabled)"
    exit 1
fi

filename="$3"
IFS=$'\n' read -d '' -r -a app < "$filename"

if [ -z "$3" ]
then
    start=0
else
    start="$4"
fi

if [ -z "$5" ]
then
    telegram=""
else
    telegram="$5"
fi

echosuc "[OK] ${#app[@]} apps loaded:"
echosuc "${app[*]}"


echo "[?] Executing the appium client for single app"

echolog "Appium Terminal Script started"
echolog "-- CONFIGURATION"
echolog "Port number for appium server: $1"
echolog "Device ID: $2"
echolog "App loaded: $3"
echolog "Start from: $start"
echolog "Telegram command: $telegram"
echolog "-- EXECUTION"


i="$3"
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
    echosuc "[OK] Creating folders and files because $dir did not exist"
else 
    echolog "Folder exists: Yes, at $dir"
    echosuc "[?] Folder $dir already exists"
fi
echolog "Node script START for $i"

if [ -n "$telegram" ]
then
    $telegram "Test START for $i"
fi

echo "[?] Starting node script..."
node "$qrfuzzdir"/index.js "$i" "$dir" "$1" "$2" "$start"
echosuc "----------- END $i -------------"
echo "[?] Sleeping for 5s"
echolog "Node script FINISH for $i"
sleep 5
echolog "Appium Terminal Script exited"

if [ -n "$telegram" ]
then
    $telegram "Test FINISH for $i"
    log=$(cat log-appium-terminal-single-"$timestamp".txt)
    $telegram "$log"
fi