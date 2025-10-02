@echo off
setlocal enabledelayedexpansion

:: Colors for Windows console
set "YELLOW=[33m"
set "GREEN=[32m"
set "RED=[31m"
set "NC=[0m"

echo %YELLOW%Starting COVID-19 Dashboard setup...%NC%

:: Check if .env file exists
if not exist .env (
    echo %YELLOW%Creating .env file...%NC%
    set /p "api_key=Enter your RapidAPI key: "
    echo RAPID_API_KEY=!api_key!> .env
    echo %GREEN%.env file created successfully%NC%
)

:: Check if Docker Desktop is running
tasklist /FI "IMAGENAME eq Docker Desktop.exe" 2>NUL | find /I /N "Docker Desktop.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo %RED%Error: Docker Desktop is not running.%NC%
    echo Please start Docker Desktop and try again.
    echo If Docker Desktop is not installed, get it from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

:: Start the application
echo %YELLOW%Building and starting the application...%NC%
docker-compose up --build

:: Check if docker-compose was successful
if %ERRORLEVEL% EQU 0 (
    echo %GREEN%Application is running!%NC%
    echo %GREEN%Visit http://localhost:8080 to view the dashboard%NC%
) else (
    echo %RED%Failed to start the application. Please check the error messages above.%NC%
    pause
    exit /b 1
)

endlocal