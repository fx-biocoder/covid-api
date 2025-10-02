#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting COVID-19 Dashboard setup...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    read -p "Enter your RapidAPI key: " api_key
    echo "RAPID_API_KEY=$api_key" > .env
    echo -e "${GREEN}.env file created successfully${NC}"
fi

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker and Docker Compose are required but not installed.${NC}"
    echo "Please install Docker and Docker Compose first:"
    echo "https://docs.docker.com/engine/install/"
    echo "https://docs.docker.com/compose/install/"
    exit 1
fi

# Start the application
echo -e "${YELLOW}Building and starting the application...${NC}"
docker-compose up --build

# Check if docker-compose was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Application is running!${NC}"
    echo -e "${GREEN}Visit http://localhost:8080 to view the dashboard${NC}"
else
    echo -e "${RED}Failed to start the application. Please check the error messages above.${NC}"
    exit 1
fi