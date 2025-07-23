# 1. Base image with Node.js for building the app
FROM node:18-alpine as build

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code and build
COPY . .
ARG REACT_APP_WEATHER_API_KEY
ENV REACT_APP_WEATHER_API_KEY=$REACT_APP_WEATHER_API_KEY
RUN npm run build

# 5. Use Nginx to serve the built app
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# 6. Expose port 80 and run Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
