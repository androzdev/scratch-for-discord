# Scratch For Discord

Scratch For Discord desktop app codebase.

<img src="https://i.imgur.com/LsV7CsE.png" height="480" width="720" alt="preview" />

# Features

- Lightweight
- Auto updater included
- Simple design
- Easy to use
- Custom Scratch server support
- Can be used without internet
- Slash Commands GUI extension included

# Structure

- `/.github`                            : Github workflows that build and publish the app
- `/src`                                : Reactjs codebase
- `/public`                             : Assets and root page for react codebase
- `/environments`                       : Electron
  - `/environments/updates`             : Application updates handler
  - `/environments/scripts`             : Preload scripts
  - `/environments/assets`              : Assets
  - `/environments/core`                : Application core
    - `/environments/core/extensions`   : IPC events handler
    - `/environments/core/rpc`          : Discord RPC, maybe?
    - `/environments/core/server`       : Local server that serves s4d when there is no internet
    - `/environments/core/storage`      : Storage management

# Technologies

## Core

- JavaScript
- Electron

## Frontend

- Reactjs
- Tailwindcss
- Fontawesome

# is it free to use?

Scratch For Discord is completely open-source and free to use.