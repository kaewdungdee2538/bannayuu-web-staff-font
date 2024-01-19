# Use the official Node.js runtime as the base image
FROM node:13.12.0-alpine as build

ENV NODE_ENV build

WORKDIR /app
COPY . .

RUN npm install 
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]