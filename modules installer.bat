@echo off
:: get the directory of the bat file
 @setlocal enableextensions
:: set the directory to the folder before /lib
 @cd /d "%~dp0"
:: send some information
echo Before running the installer make sure you have
echo Visual Studio: https://code.visualstudio.com/
echo NodeJS: https://nodejs.org/en/
echo after installing nodejs you have to restart your pc to install it in path
echo this might take a while so be patient
echo IMPORTANT: RUN THIS AS AN ADMIN!
echo if you followed the steps and you still get a error message me on discord: Felix#9385
:: show the current directory
cd
:: download discord.js as base for the client
call npm i discord.js
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
:: send info messages and then pause
echo finished installing.
echo press any key to close the installer
PAUSE >nul