# Telegram Notifier

This is a tiny Telegram notifier made out of Bash scripts to get notification about running applications in the Smartphone. It is useful to get notified working with QRFuzz whenever an application suddenly crashes.

## `telegram-send`

Sends a telegram message to a chat using the Linux CLI.

### Usage

1. Put this file in /usr/bin/telegram-send and change ownership to root
    - Change the `GROUP_ID` and `BOT_TOKEN` variables in the script
2. Invoke this script from the bash using `telegram-send <message>` 

## `telegram-pidof`

Checks if an application is running in Android and sends a message if the application stop running.

### Usage

1. In a terminal, type `./telegram-pidof.sh <app_name>`
2. Let the terminal open
