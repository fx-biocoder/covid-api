# COVID-19 Statistics Dashboard

A real-time dashboard that displays COVID-19 statistics using the COVID-19 Statistics API from RapidAPI.

## Features

- Display of key COVID-19 metrics:
  - Confirmed cases
  - Active cases
  - Deaths
  - Recoveries
- Data caching for improved performance
- Light/Dark theme toggle
- Responsive design
- Dockerized deployment

## Prerequisites

- Node.js (v20 or later)
- npm
- Docker and Docker Compose (for containerized deployment)
- A RapidAPI key for the [COVID-19 Statistics API](https://rapidapi.com/api-sports/api/covid-19-statistics/)

## Quick Start

Choose the appropriate script for your operating system:

### Windows (PowerShell)
```powershell
.\run.ps1
```

### Windows (Command Prompt)
```batch
run.bat
```

### Linux/macOS
```bash
# Make the script executable
chmod +x run.sh
# Run the script
./run.sh
```

The script will:
1. Check if you have Docker installed and running
2. Create a `.env` file if it doesn't exist (you'll need to enter your RapidAPI key)
3. Build and start the application using Docker Compose
4. Provide you with the URL to access the dashboard

Once running, visit http://localhost:8080 to view the dashboard.

## Manual Setup

If you prefer to set up manually:

1. Clone the repository:
   ```bash
   git clone https://github.com/fx-biocoder/covid-api.git
   cd covid-api
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your RapidAPI key:
   ```
   RAPID_API_KEY=your_api_key_here
   ```

3. Using Docker (recommended):
   ```bash
   docker-compose up --build
   ```

4. Or for local development:
   ```bash
   npm install
   npm run dev
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Docker Deployment

To run the application using Docker:

1. Make sure you have Docker and Docker Compose installed

2. Build and start the container:
   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost:8080`

## Project Structure

```
├── dist/              # Compiled files
├── scripts/           
│   ├── build.js       # esbuild configuration
│   └── generate-config.js
├── src/               # Source code
│   ├── types/         # TypeScript interfaces and types
│   │   └── index.ts
│   ├── services/      # Core services
│   │   ├── api.ts     # API integration
│   │   ├── cache.ts   # Cache management
│   │   └── theme.ts   # Theme management
│   ├── ui/            # UI components
│   │   └── statistics.ts  # Statistics display
│   ├── config/        # Auto-generated config
│   │   └── index.ts
│   └── app.ts         # Main application code
├── index.html         # Main HTML file
├── styles.css         # Application styles
├── run.sh            # Linux/macOS startup script
├── run.ps1           # Windows PowerShell startup script
├── run.bat           # Windows CMD startup script
├── Dockerfile
└── docker-compose.yml
```

## Development

- `npm run build` - Builds the application
- `npm start` - Starts the development server
- `npm run dev` - Runs the application in development mode with watch

## Environment Variables

- `RAPID_API_KEY`: Your RapidAPI key for accessing the COVID-19 Statistics API

## Technologies Used

- TypeScript
- esbuild for bundling
- Docker & Nginx for deployment
- RapidAPI COVID-19 Statistics API

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Acknowledgments

- Data provided by [COVID-19 Statistics API](https://rapidapi.com/api-sports/api/covid-19-statistics/)
- Icons from [Feather Icons](https://feathericons.com/)