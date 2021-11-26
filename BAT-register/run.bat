@echo off
rem Author: Josélio de S. C. Júnior
rem Github: joseliojunior
rem E-mail: joseliojrx25@gmail.com
rem License: MIT

if not exist %cd%\node_modules call:InstallDependencies

call:StartProgram

:InstallDependencies
    echo You need no install the dependences of this project in order to run it properly.
    echo Trying to install via `npm i` command!
    npm i && call:StartProgram
goto:eof

:StartProgram
    cls
    node init
    rem Exit the main program.
    rem Create a CSV file in database folder from JSON.
    cd database
    node JSONtoCSV
exit