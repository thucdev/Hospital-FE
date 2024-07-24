# Use node:alpine image as the base for a smaller footprint
FROM node:alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm ci --production

# Copy the rest of the app files
COPY . .

# Switch to a slimmer runtime image for the final image
FROM node:alpine

WORKDIR /app

# Copy the production build of the React app
COPY --from=builder /app/build .

# Expose port 3000 where the React app typically runs
EXPOSE 3000

# Start the app by running npm start
CMD [ "npm", "start" ]
