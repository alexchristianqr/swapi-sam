import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { provider } from "./gateways/people-mysql.gateway"

interface Response {
  message: string | null
  result: any
}

class PeopleService {
  async create(event: APIGatewayProxyEvent): Promise<Response> {
    const createExampleDto = JSON.parse(event.body)
    const result = await provider.create(createExampleDto)
    return {
      message: "people created",
      result: result
    }
  }

  async findAll(event: APIGatewayProxyEvent): Promise<Response> {
    const result = await provider.findAll()
    return {
      message: "people list",
      result: result
    }
  }
}

export const peopleService = new PeopleService()
