FROM node:14.15-alpine

# Carpeta de trabajo para docker
WORKDIR /app

# Copiar y ejecutar
COPY ./package*.json /app/
RUN npm install --force

# Copiar el proyecto
COPY ./dist .

# Desplegar aplicación
EXPOSE 3000
