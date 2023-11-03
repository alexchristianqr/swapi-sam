import { ResponseToHandler } from "../../../shared/interfaces/global.interface"
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"

export abstract class PeopleInputService {
  abstract create(event: APIGatewayProxyEvent): Promise<ResponseToHandler>
  abstract findById(event: APIGatewayProxyEvent): Promise<ResponseToHandler>
  abstract findAll(event: APIGatewayProxyEvent): Promise<ResponseToHandler>
}
