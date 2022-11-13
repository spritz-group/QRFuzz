#!/bin/bash

APP=$1

while [ TRUE ]
do
	RES=$(adb shell pidof $APP)
	if [ "$RES" ]
	then
		echo "$1 is running as PID $RES..."
		sleep 5
	else
		echo "$APP exited!"
		telegram-send "$APP closed in the Android Smartphone!"
		exit 0
	fi
done
