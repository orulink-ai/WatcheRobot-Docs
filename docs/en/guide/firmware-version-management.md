# Firmware version management

WatcheRobot treats firmware switching, user-data removal, and device recovery as separate operations. This prevents a downgrade from silently deleting data and prevents a partial configuration wipe from being presented as firmware recovery.

## Client-managed version switching

Use the client for normal upgrades and downgrades. Available releases, stability labels, and hardware compatibility are determined by the release catalog shown by the client.

Before switching, keep power stable and confirm hardware, resource, and persistent-data compatibility. If the target version is not offered by the client, do not bypass validation and write an OTA slot manually.

## Clear device data

Use data clearing when transferring ownership, signing out, or repairing persistent configuration. It removes network, pairing, account, downloaded Application, and user settings without choosing a historical firmware version.

The robot must be provisioned and paired again afterwards.

## Automatic OTA rollback

Automatic rollback handles a newly written firmware that cannot pass its startup health check. The Bootloader returns to the last confirmed OTA slot without requiring the user to reach the settings screen.

Rollback is a reliability mechanism, not a user-requested downgrade.

## Wired recovery

Use USB and the official Daemon maintenance flow when the app cannot boot, both OTA slots are unavailable, or the client cannot establish a normal connection.

Use an official release bundle and validate the hardware model, partition table, and image digest. Do not add `erase-flash` unless a full erase is explicitly required.

## Responsibility map

| Goal                        | Correct owner                 |
| --------------------------- | ----------------------------- |
| Normal upgrade or downgrade | Client version management     |
| Remove personal data        | Clear device data             |
| New OTA fails to boot       | Bootloader automatic rollback |
| Device cannot boot normally | USB wired recovery            |
