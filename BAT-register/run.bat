@echo off
: Author: Josélio de S. C. Júnior
: Github: joseliojunior
: E-mail: joseliojrx25@gmail.com
: License: MIT

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
    : Exit the main program.
    : Create a CSV file in database folder from JSON.
    cd database
    node JSONtoCSV
exit