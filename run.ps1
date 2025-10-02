# PowerShell script to run the COVID-19 Dashboard

# Function to write colored output
function Write-ColorOutput {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Message,
        [Parameter(Mandatory=$false)]
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorOutput "Starting COVID-19 Dashboard setup..." "Yellow"

# Check if .env file exists
if (-not (Test-Path .env)) {
    Write-ColorOutput "Creating .env file..." "Yellow"
    $apiKey = Read-Host "Enter your RapidAPI key"
    "RAPID_API_KEY=$apiKey" | Out-File -FilePath .env -Encoding UTF8
    Write-ColorOutput ".env file created successfully" "Green"
}

# Check if Docker Desktop is installed and running
try {
    $dockerProcess = Get-Process "Docker Desktop" -ErrorAction SilentlyContinue
    if (-not $dockerProcess) {
        Write-ColorOutput "Error: Docker Desktop is not running." "Red"
        Write-ColorOutput "Please start Docker Desktop and try again." "Red"
        Write-ColorOutput "If Docker Desktop is not installed, get it from: https://www.docker.com/products/docker-desktop" "Yellow"
        exit 1
    }
} catch {
    Write-ColorOutput "Error: Unable to check Docker Desktop status." "Red"
    Write-ColorOutput "Please ensure Docker Desktop is installed and running." "Red"
    exit 1
}

# Start the application
Write-ColorOutput "Building and starting the application..." "Yellow"
try {
    docker-compose up --build
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "Application is running!" "Green"
        Write-ColorOutput "Visit http://localhost:8080 to view the dashboard" "Green"
    } else {
        Write-ColorOutput "Failed to start the application. Please check the error messages above." "Red"
        exit 1
    }
} catch {
    Write-ColorOutput "An error occurred while starting the application:" "Red"
    Write-ColorOutput $_.Exception.Message "Red"
    exit 1
}