@echo off
@setlocal enableextensions
@cd /d "%~dp0"/..

echo Before running the installer make sure you have
echo Visual Studio: https://code.visualstudio.com/
echo NodeJS: https://nodejs.org/en/
echo if you have these files and you still get a error message me on discord: Felix#9385
echo this might take a while so be patient
echo IMPORTANT: RUN THIS AS AN ADMIN!
cd

call npm i discord.js
call npm i fs
call npm i snekfetch
call npm i request
call npm i lodash
call npm i https
call npm i -g --add-python-to-path --vs2015 --production windows-build-tools
call npm i better-sqlite-pool
call npm i enmap

echo finished installing.
echo press any key to close the installer
PAUSE >nul