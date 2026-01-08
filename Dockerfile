# Build Stage
FROM node:22 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code 
COPY . .

# Set build-time environment variables
ARG VITE_API_BASE

# Use the build argument to set the environment variable
ENV VITE_API_BASE=${VITE_API_BASE}

# Build the React app
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the build output to nginx html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]