# Firmware version management

WatcheRobot treats firmware switching, device-data reset, startup rollback, and device recovery as separate operations. This prevents a downgrade from silently deleting data and prevents a settings reset from being mistaken for restoration of a historical firmware image.

## Client-managed version switching

Use the client for normal upgrades and downgrades. Available releases, stability labels, and hardware compatibility are determined by the release catalog shown by the client.

Before switching, keep power stable and confirm hardware, resource, and persistent-data compatibility. If the target version is not offered by the client, do not bypass validation and write an OTA slot manually.

## Embedded Factory Reset (current implementation)

::: warning Factory Reset is not a firmware downgrade
**Factory Reset** in device settings resets data owned by the current firmware. It does not roll the firmware back and does not flash a bundled “factory version.” After restarting, the robot continues to run the same firmware version that was active before the reset.
:::

This path is active in the current firmware. After the user confirms the action by swiping on **Settings > Factory Reset**, the embedded software performs these steps:

| Current action | Effect |
| --- | --- |
| Disconnect Wi-Fi and clear its credentials | The robot must be provisioned again after restart |
| Call `nvs_flash_erase()` | Erase settings and credentials stored in the default NVS partition |
| Remove `/spiffs/app_center` | Delete Application packages downloaded to that directory |
| Restart the robot | Boot again from the current OTA application partition |

The current path does not intentionally erase the SD card or storage outside the default NVS partition and `/spiffs/app_center`. It must not be described as a full-chip erase. Before transferring ownership, separately review data written by a product release to any other partition or the SD card.

The embedded entry should remain available because offline devices, damaged Wi-Fi settings, and ownership transfers need a reprovisioning path that does not depend on the client. Product copy can gradually converge on “Reset device data (Factory Reset).” Normal upgrades and downgrades remain the responsibility of client version management.

## Automatic OTA rollback

Automatic rollback handles a newly written firmware that cannot pass its startup health check. The Bootloader returns to the last confirmed OTA slot without requiring the user to reach the settings screen.

Rollback is a reliability mechanism, not a user-requested downgrade.

## Wired recovery

Use USB and the official Daemon maintenance flow when the app cannot boot, both OTA slots are unavailable, or the client cannot establish a normal connection.

Use an official release bundle and validate the hardware model, partition table, and image digest. Do not add `erase-flash` unless a full erase is explicitly required.

## Responsibility map

| Goal | Correct owner | Firmware result |
| --- | --- | --- |
| Normal upgrade or downgrade | Client version management | Switch to the selected compatible release |
| Clear settings and provision again | Factory Reset in device settings | Keep the current firmware version |
| New OTA fails to boot | Bootloader automatic rollback | Return to the last confirmed OTA slot |
| Device cannot boot normally | USB wired recovery | Write the selected official recovery bundle |
