# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose backend port (change if your server uses a different port)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]