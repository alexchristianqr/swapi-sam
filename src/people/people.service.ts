import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { provider } from "./gateways/people-mysql.gateway"
import { ResponseToHandler } from "../shared/global.interface"

class PeopleService {
  /**
   * Crear persona
   * @param event
   */
  async create(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    const createExampleDto = JSON.parse(event.body)
    const result = await provider.create(createExampleDto)
    return {
      success: true,
      message: "people created",
      result: result
    }
  }

  /**
   * Listar personas
   * @param event
   */
  async findAll(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    // const {} = event.queryStringParameters
    const result = await provider.findAll()

    // Retornar re
    return {
      success: true,
      message: "people list",
      result: result
    }
  }

  /**
   * Buscar persona
   * @param event
   */
  async findById(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    const { id } = event.pathParameters
    const result = await provider.findById(parseInt(id))
    return {
      success: true,
      message: "people founded",
      result: result
    }
  }
}

export const peopleService = new PeopleService()
