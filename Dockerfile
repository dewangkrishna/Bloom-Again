# Use the official Node.js 16 image as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the app
CMD node app.js
