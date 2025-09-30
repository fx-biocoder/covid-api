# Use Node.js LTS version as the base image
FROM node:20-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Set build argument for API key
ARG RAPID_API_KEY
ENV RAPID_API_KEY=$RAPID_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files (excluding .env files)
COPY . .

# Generate config and bundle
RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine

# Copy built files
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/dist
COPY --from=builder /usr/src/app/index.html /usr/share/nginx/html/
COPY --from=builder /usr/src/app/styles.css /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Nginx runs automatically
CMD ["nginx", "-g", "daemon off;"]