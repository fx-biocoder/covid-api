const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function generateConfig() {
  // Load environment variables
  dotenv.config();

  const config = {
    rapidApiKey: process.env.RAPID_API_KEY || ''
  };

  // Create config directory if it doesn't exist
  const configDir = path.join(__dirname, '..', 'src', 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  // Write config file
  const configPath = path.join(configDir, 'index.ts');
  const configContent = `export const config = ${JSON.stringify(config, null, 2)} as const;`;
  
  fs.writeFileSync(configPath, configContent);
  console.log('Config file generated successfully');
}

generateConfig();