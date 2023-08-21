/**
 * Función de prueba para imprimir en consola
 * @param event
 * @param context
 * @returns {Promise<{body: string, statusCode: number}>}
 */
async function sayHelloWorld(event, context) {
  try {
    // Logger
    console.log("[handler.sayHelloWorld]", JSON.stringify({ event, context }))

    if (process.env.MYSECRET_ENV) {
      console.log("La variable de entorno encontrada es: MYSECRET_ENV=", process.env.MYSECRET_ENV)
    }

    console.log("Hola mundo desde lambda function...")

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Hola mundo desde lambda function con API Gateway..."
      })
    }
  } catch (error) {
    console.error(error)
  }
}

exports.handler = function (event, context) {
  return sayHelloWorld(event, context)
}
