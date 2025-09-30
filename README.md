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

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/fx-biocoder/covid-api.git
   cd covid-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your RapidAPI key:
   ```
   RAPID_API_KEY=your_api_key_here
   ```

4. Build the project:
   ```bash
   npm run build
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
├── dist/               # Compiled files
├── scripts/           
│   ├── build.js       # esbuild configuration
│   └── generate-config.js
├── app.ts             # Main application code
├── config.template.ts # Configuration template
├── index.html        
├── styles.css         # Application styles
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