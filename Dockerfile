# Stage 1: Build the React app
FROM node:16 AS react-build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for the React app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Build the React application with Vite
RUN npm run build  # Ensure this outputs to the public directory

# Stage 2: Set up PHP environment
FROM php:8.3-fpm-alpine AS php-backend

# Set the timezone
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install system dependencies
RUN apk add --no-cache git curl libpng-dev oniguruma-dev libzip-dev zip unzip libpq-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Laravel application files
COPY . .

# Copy built files from the React app to the public directory
COPY --from=react-build /app/public /var/www/public

# Install Composer dependencies
RUN composer install

# Expose port for PHP-FPM
EXPOSE 9000
