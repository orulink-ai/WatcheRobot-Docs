# Firmware version management

Switching firmware, performing a Factory Reset, and recovering a robot that cannot start solve different problems. Check your goal before choosing an action.

## Switch versions in the client

Use client version management for upgrades and downgrades. The client lists the releases available for the connected robot. A release that is not listed may not be compatible with your device.

Before switching versions:

- Keep the robot connected to stable power.
- Do not disconnect it while a release is downloading or installing.
- Back up anything you need to keep if the client says that data must be cleared.

## Factory Reset

Use Factory Reset when you want to:

- Change Wi-Fi or set up the robot again.
- Start again with default device settings.
- Prepare the robot for another person.

::: warning The firmware version does not change
Factory Reset clears device data. It does not downgrade the robot to the version it had when purchased and does not install different firmware. After restarting, the robot runs the same firmware version it had before the reset.
:::

Factory Reset clears:

- Saved Wi-Fi information.
- Device settings and credentials stored on the robot.
- Applications downloaded to the robot.

Files on the SD card are not intentionally removed. Before transferring the robot, remove the SD card or check it separately for personal content.

### Before you start

- Keep the Wi-Fi name and password you will use for setup.
- Back up anything you need to keep.
- Charge the robot or connect it to power.

### Steps

1. Open **Settings** on the robot.
2. Select **Factory Reset**.
3. Swipe as instructed on the screen to confirm.
4. Wait for the robot to restart. Do not turn off the power before it finishes.

### After the reset

The robot returns to setup mode. Connect it to Wi-Fi again, reconnect it in the client, then download Applications and adjust device settings as needed.

## If an update fails

Factory Reset cannot repair damaged firmware and cannot select another firmware version.

If the robot cannot start after an update, it may use automatic OTA rollback to return to the last working release. If it does not recover on its own, or you cannot open Settings, use USB wired recovery.

## Wired recovery

If the robot cannot start normally or the client cannot connect to it, use USB and an official recovery bundle. Do not erase the whole device unless the official instructions explicitly require it.

## Choose the right action

| Your goal | Feature to use | Does the firmware version change? |
| --- | --- | --- |
| Upgrade or downgrade | Client version management | Yes |
| Clear settings and set up again | Factory Reset | No |
| Robot cannot start after an update | Automatic OTA rollback or USB wired recovery | Depends on the recovery method |
| Robot cannot start at all | USB wired recovery | Determined by the selected official recovery bundle |
