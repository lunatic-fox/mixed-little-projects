@echo off
: Author: Josélio de S. C. Júnior
: Github: joseliojunior
: E-mail: joseliojrx25@gmail.com
: License: MIT

if not exist %cd%\node_modules call:InstallDependencies
if not exist %cd%\package-lock.json call:InstallDependencies

call:StartProgram

:InstallDependencies
    node %cd%\setup\alert 
    npm i && call:StartProgram
exit

:StartProgram
    cls
    node init
    : Exit the main program.
    : Create a CSV file in database folder from JSON.
    cd database
    node JSONtoCSV
exit