console.log("Greeting from app.ts")
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Logger
    console.log("[handler]", JSON.stringify({ event }))

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
