# AWS SAM CLI

La CLI de AWS SAM admite un archivo de configuración a nivel de proyecto que almacena parámetros predeterminados para sus comandos. Este archivo de configuración está en formato de archivo TOML y el
nombre de archivo predeterminado es samconfig.toml. La ubicación predeterminada del archivo es el directorio raíz de su proyecto, que contiene el archivo de plantilla de AWS SAM de su proyecto.

Puede editar manualmente este archivo para establecer parámetros predeterminados para cualquier comando de la CLI de AWS SAM. Además, el comando sam deployment --guided escribe un subconjunto de
parámetros en su archivo de configuración. Para obtener más información sobre este comando, consulte Escritura de configuraciones con sam deployment --guided más adelante en este tema.

## Official documentation

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html

## How to use

```bash
# Crear archivo template.yml
node build-template.js --template="example"

# Instalar dependencias para cloud formation
sam build --config-file="samconfig-develop.toml"

# Desplegar SAM Application
sam deploy --config-file="samconfig-develop.toml"
```

```bash
sam local start-api --config-file="samconfig-develop.toml"
```
