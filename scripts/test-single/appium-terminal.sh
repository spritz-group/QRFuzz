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


bo=$(tput bold)
no=$(tput sgr0)

echosuc "[ QRCodeFuzzer (Appium) Terminal ]"
echo "[?] Checking script arguments"

# Usage text
text_version="\t QRCodeFuzzer (Appium) Terminal \n"
text_usage="${bo}USAGE${no}\n"
text_usage+="\t ./appium-terminal.sh [ARGUMENTS]\n"
text_usage+="${bo}APP${no} \n"
text_usage+="$text_version \n"
text_usage+="${bo}ARGUMENTS${no} \n"
text_usage+="\t -p <port_number> \t (REQUIRED) Port number of the appium server \n"
text_usage+="\t -d <device_id> \t (REQUIRED) The device id from <adb devices> \n"
text_usage+="\t -a <app_name> \t\t (REQUIRED) Set the name of the app to test \n"
text_usage+="\t -s <start_position> \t Set the position number to start from \n"
text_usage+="\t --set-notification \t Bash command to send notification through a script (es. Telegram Notifier) \n"
usage=$(printf "$text_usage \n")


notification=""; port=""; app=""; start=""; device="";

# Check Arguments
while [[ $# -gt 0 ]]; do
    case "${1}" in
        '-a')
            app="${2}"; shift 2 ;;
        '-s')
            start="${2}"; shift 2 ;;
        '-p')
            port="${2}"; shift 2 ;;
        '-d')
            device="${2}"; shift 2 ;;
        '--set-notification')
            notification="${2}"; shift 2 ;;
        *)
            echo "$usage"; echoerr "[Error] Invalid flag ${1}"; exit 1 ;;
    esac
done

# Check App argument
if [ -z "$app" ]
then
    echo "$usage"
    echoerr "[Error] App argument (-a) is required"
    exit 1
fi

# Check Port argument
if [ -z "$port" ]
then
    echo "$usage"
    echoerr "[Error] Port argument (-p) is required"
    exit 1
fi

# Check Port argument
if [ -z "$device" ]
then
    echo "$usage"
    echoerr "[Error] Device ID argument (-d) is required"
    exit 1
fi

# Check start
if [ -z "$start" ]
then
    start=0
fi

# Check Notification
if [ -z "$notification" ]
then
    notification=""
fi

echosuc "[OK] ${#app[@]} apps loaded:"
echosuc "${app[*]}"


echo "[?] Executing the appium client for single app"

echolog "Appium Terminal Script started"
echolog "-- CONFIGURATION"
echolog "Port number for appium server: $port"
echolog "Device ID: $device"
echolog "App loaded: $app"
echolog "Start from: $start"
echolog "Notification bash command: $notification"
echolog "-- EXECUTION"


i="$app"
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

if [ -n "$notification" ]
then
    $notification "Test START for $i"
fi

echo "[?] Starting node script..."
node "$qrfuzzdir"/index.js "$i" "$dir" "$port" "$device" "$start"
echosuc "----------- END $i -------------"
echo "[?] Sleeping for 5s"
echolog "Node script FINISH for $i"
sleep 5
echolog "Appium Terminal Script exited"

if [ -n "$notification" ]
then
    $notification "Test FINISH for $i"
    log=$(cat log-appium-terminal-single-"$timestamp".txt)
    $notification "$log"
fi