# Docker

Docker es una plataforma abierta para desarrollar, enviar y ejecutar aplicaciones. Docker le permite separar sus aplicaciones de su infraestructura para que pueda entregar software rápidamente. Con
Docker, puede administrar su infraestructura de la misma manera que administra sus aplicaciones. Al aprovechar las metodologías de Docker para enviar, probar e implementar el código rápidamente, puede
reducir significativamente la demora entre escribir el código y ejecutarlo en producción.

## Official documentation

https://docs.docker.com/get-started/02_our_app/

## Run with docker-compose

```bash
# Crear imagen con docker
docker-compose up -d --build
```

## Run with docker

```bash
# Crear imagen con docker
docker build -t mydemoapp .

# Crear un contenedor a partir de una imagen con docker en el puerto X
docker run -dp 3000:3000 mydemoapp

# Crear un contenedor a partir de una imagen con docker en el puerto X incluye un argumento extra
docker run -dp 3000:3000 --add-host=networklocalhost:192.168.0.13 mydemoapp
```

## Docker push AWS ECR
```bash
# Crear imagen con docker
docker build -t mydemoapp .

# Crear un contenedor a partir de una imagen con docker en el puerto X
docker run -dp 3000:3000 mydemoapp

# Crear un contenedor a partir de una imagen con docker en el puerto X incluye un argumento extra
docker run -dp 3000:3000 --add-host=networklocalhost:192.168.0.13 mydemoapp
```