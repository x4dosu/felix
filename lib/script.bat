@echo off
:: get the directory of the bat file
@setlocal enableextensions
:: set the directory to the folder before /lib
@cd /d "%~dp0"/..
:: send some information
echo Before running the installer make sure you have
echo Visual Studio: https://code.visualstudio.com/
echo NodeJS: https://nodejs.org/en/
echo if you have these files and you still get a error message me on discord: Felix#9385
echo this might take a while so be patient
echo IMPORTANT: RUN THIS AS AN ADMIN!
:: show the current directory
cd
:: download all the node modules needed for the bot
call npm i discord.js
call npm i fs
call npm i snekfetch
call npm i request
call npm i lodash
call npm i https
:: this is needed for better-sqlite-pool
call npm i -g --add-python-to-path --vs2015 --production windows-build-tools
:: this is needed for enmap
call npm i better-sqlite-pool
call npm i enmap
:: send info messages and then pause
echo finished installing.
echo press any key to close the installer
PAUSE >nul