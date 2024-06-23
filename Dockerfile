# Use Node.js base image
FROM node:latest

# Set working directory
WORKDIR /Events-Project

# Copy package.json and package-lock.json for backend
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy source code into / directory
COPY . .

# Change working directory to /backend
WORKDIR /Events-Project/frontend

# Install frontend dependencies and build frontend
RUN npm install && npm run build

WORKDIR /Events-Project

# Expose port
EXPOSE 5000

# Start backend server
CMD ["node", "backend/server.js"]