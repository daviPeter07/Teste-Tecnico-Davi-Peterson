# Imagem oficial do PHP fixada em uma versão específica para manter o build previsível.
# Em produção, recomenda-se reavaliar a imagem com scanners como Docker Scout ou Trivy.
FROM php:8.3.30-cli

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
