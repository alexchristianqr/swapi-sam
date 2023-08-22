import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy"
import { peopleService } from "./people.service"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | any> => {
  try {
    // Logger
    console.log("[people.handler]", JSON.stringify({ event }))

    let result = null

    switch (event.httpMethod) {
      case "GET":
        switch (event.resource) {
          case "/people":
            result = await peopleService.findAll(event)
            return {
              statusCode: 200,
              body: JSON.stringify({ result })
            }
          case "/people/{id}":
            result = await peopleService.findById(event)
            return {
              statusCode: 200,
              body: JSON.stringify({ result })
            }
          default:
            return {
              statusCode: 500,
              body: JSON.stringify({
                success: false,
                message: `Metodo: ${event.httpMethod} y recurso: ${event.resource} no disponible`
              })
            }
        }

      case "POST":
        result = await peopleService.create(event)
        return {
          statusCode: 200,
          body: JSON.stringify({ result })
        }
      default:
        return {
          statusCode: 500,
          body: JSON.stringify({
            success: false,
            message: `Metodo: ${event.httpMethod} y recurso: ${event.resource} no disponible`
          })
        }
    }
  } catch (error) {
    console.error(error)
  }
}
