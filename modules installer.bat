@echo off
:: get the directory of the bat file
@setlocal enableextensions
:: set the directory to the folder before /lib
@cd /d "%~dp0"
:: send some information
echo Checklist before running this:
echo 1. Install NodeJS: https://nodejs.org/en/
echo 2. Restart your PC to install it in path
echo 3. Run "modules installer.bat" as an admin
echo if you followed the steps and you still get an error, message me on discord: Felix#9385
echo Press any button to start the installation
:: Pause
PAUSE >nul
:: after unpause clear the chat
cls
:: download discord.js as base for the client (master branch cause stable is fucked)
call npm i discordjs/discord.js
:: download file system for the command handler
call npm i fs
:: download snekfetch for simple json requests
call npm i snekfetch
:: download request for more complicated requests
call npm i request
:: download lodash for sorting the requested jsons
call npm i lodash
:: download xml2json to parse xml to json
call npm i xml2json
:: download ojsama for osu pp and star rating calculation
call npm i ojsama
:: this is needed for better-sqlite-pool
call npm i -g --add-python-to-path --vs2015 --production windows-build-tools
:: this is needed for enmap
call npm i better-sqlite-pool
:: download enmap for databases
call npm i enmap
:: little timeout to read what happened
timeout 5 >nul
:: clear the chat if you want info how the installer went remove this
cls
:: send info messages and then pause
echo Finished installing the modules.
echo Press any key to close the installer
PAUSE >nul