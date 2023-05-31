FROM php:7.4-cli



WORKDIR ./php

# Our PHP will be running on port 8000
EXPOSE 8000

# Install the PDO MySQL extension so we can database
RUN docker-php-ext-install pdo_mysql

# Set up a web server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "."]
