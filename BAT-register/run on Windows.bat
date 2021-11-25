@echo off
if not exist %cd%\node_modules (
    echo You need no install the dependences of this project in order to run it properly.
    echo Trying to install via `npm i` command!
    npm i
    pause
)
node init