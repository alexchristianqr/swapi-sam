console.log("Greeting from personas.handler.ts")
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy"
import { peopleService } from "./people.service"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | any> => {
  try {
    // Logger
    console.log("[people.handler]", JSON.stringify({ event }))

    let result = null

    switch (event.httpMethod) {
      case "GET":
        result = await peopleService.findAll(event)
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            result
          })
        }
      case "POST":
        result = await peopleService.create(event)
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            result
          })
        }
      default:
        return {
          statusCode: 500,
          body: JSON.stringify({
            success: false,
            message: `El tipo de solicitud no está soportada: "${event.httpMethod}"`
          })
        }
    }
  } catch (error) {
    console.error(error)
  }
}
