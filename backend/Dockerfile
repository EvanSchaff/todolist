# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the compiled files
COPY dist ./dist

# Copy the .env file into the container
COPY .env ./

# Expose the port your app runs on (e.g., 3000)
EXPOSE 5000

# Command to start the app
CMD ["node", "dist/app.js"]
