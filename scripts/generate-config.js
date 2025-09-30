const fs = require('fs');
const path = require('path');

// Read the .env file
require('dotenv').config();

// Create the config content
const config = `// This file is auto-generated. Do not edit it manually.
export const config = {
    rapidApiKey: '${process.env.RAPID_API_KEY || ''}'
} as const;
`;

// Write to config.ts
fs.writeFileSync(path.join(__dirname, '..', 'config.ts'), config);

console.log('Config file generated successfully!');