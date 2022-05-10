#!/bin/bash

## TODO: follow this https://github.com/Maxelweb/FuzzQRTestingUNIPD/issues/7

# 1) get a list of all apps
# 2) get argument with the port of appium server and working folder path
# 3) execute sequentially all the apps invoking the command for the client (remember to create a sleep of 15 seconds after closing the client instance)


function echoerr {
    echo -e "\e[31m$1\e[39m"
}

function echosuc {
    echo -e "\e[32m$1\e[39m"
}

# Define the APPS 

# apps=("wallapop" "tiktok" "satispay" "posteid" "telegram" "zoom" "qrbarcodereader" "io" "shein" "instagram" "whatsapp" "snapchat" "paypal")

echo "[?] Checking script arguments"

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]
then
    echoerr "[ERROR] No arguments supplied, please provide: "
    echoerr "<arg1> the port number of the appium server"
    echoerr "<arg2> the device id from <adb devices>"
    echoerr "<arg3> a txt file path with list of apps in each line"
    exit 1
fi

filename="$3"
IFS=$'\n' read -d '' -r -a app < "$filename"

echosuc "[OK] ${#app[@]} apps loaded:"
echosuc "${app[*]}"

echo "[?] Check if at least one appium server is running"

if pgrep -x "node /usr/local/bin/appium" > /dev/null
then
    echosuc "[OK] Appium server is running"
else
    echoerr "[ERROR] Appium server is not running in the background. Please start it before continuing."
    exit 1
fi

echo "[?] Executing the appium clients sequentially"
echo "[?] Be aware that after each run the script will sleep for 30 seconds to wait the qrgen sync"

fuzzqrdir="../../QRCodeFuzzer"

for i in "${app[@]}"
do
	echosuc "----------- NOW EXECUTING $i -------------"
    dir="$fuzzqrdir/data-tests/$i"
    if [[ ! -e $dir ]]; then
        mkdir "$dir"
        echosuc "[OK] Creating folder because $dir did not existed"
    else 
        echosuc "[?] Folder $dir already exists"
    fi
    echo "[?] Starting node script..."
    node index.js "$i" "$dir" "$1" "$2"
    echosuc "----------- END $i -------------"
    echo "[?] Sleeping for 30s"
    sleep 30
done

