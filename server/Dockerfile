# Use Node.js Alpine
FROM node:22.16.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies needed for prisma generate)
RUN npm install

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 4000

# Start server
CMD ["npm", "run", "start"]
