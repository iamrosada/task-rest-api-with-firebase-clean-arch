# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "run","dev"]
