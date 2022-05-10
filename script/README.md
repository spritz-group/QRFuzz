# Manual Test Execution 

> Get with `adb devices` the `udid` of the devices to use as "device name". 

1. Start `appium -p 4723` in terminal A (even in background)
2. Start `appium -p 4724` in terminal B (even in background)
3. Start a bash script with `python main.py -a <app> -j <json_path>` for terminal 1
4. Start a bash script with `python main.py -a <app> -j <json_path>` for terminal 2
5. Start a bash script with `node index.js <app> <data_path> <port> <device_name>` for terminal 3 (same path as terminal 1)
6. Start a bash script with `node index.js <app> <data_path> <port> <device_name>` for terminal 4 (same path as terminal 2)
