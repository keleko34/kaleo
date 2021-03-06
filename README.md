# Kaleo

## Project setup

1. `npm install`
2. `npm start`

Thats it!

to run in debug mode: `npm run debug`

to build the executables: `npm run build`

## Project structure

Platform
|
|-- Gui (files related to the window and gui functionality)
|
|-- Engine (files related to 3d rendering of the scene)
|
|-- Game (game related assets, models, and scripts)


## Scripts

- start (Builds the project to /Build and runs nwjs fromt hat folder)
- debug (Starts a Vue server and runs nwjs against localhost url)
- build (Builds the project to /Build and then uses nwjs to package it into an exe in /Distribution)
- setup (Copies necessary directx files for windows to the nw folder)
- kill (Kills all processes related to the application)

## Distribution
The app will be built into a final runnable executable in the /Distribution folder.

The current builds are: `win32`, `win64`, and `osx64`

## Extra Information
This app takes advantage of the nwjs contexts by splitting the gui and engine code.

- The gui lives on the frontend context
- The engine lives on the backend context
- They both share data through memory shared globals

Read more:
http://docs.nwjs.io/en/latest/For%20Users/Advanced/JavaScript%20Contexts%20in%20NW.js/
