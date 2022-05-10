#!/bin/bash

## TODO: follow this https://github.com/Maxelweb/FuzzQRTestingUNIPD/issues/7

# 1) get a list of all apps
# 2) get argument with the port of appium server and working folder path
# 3) execute sequentially all the apps invoking the command for the client (remember to create a sleep of 15 seconds after closing the client instance)


# Define the APPS 

# apps=("wallapop" "tiktok" "satispay" "posteid" "telegram" "zoom" "qrbarcodereader" "io" "shein" "instagram" "whatsapp" "snapchat" "paypal")

if [ -z "$1" ]
    then
        echo "No arguments supplied, please select a txt file with list of apps as single argument"
        exit 1
fi

filename="$1"
IFS=$'\n' read -d '' -r -a app < "$filename"

echo "${app[1]}"


# --- DO NOT TOUCH UNDER THIS LINE ---