import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { ResponseToHandler } from "../../shared/interfaces/global.interface"
import { PeopleOutputRepository } from "../domain/ports/people-output.repository"
import { PeopleInputService } from "../domain/ports/people-input.service"

export class PeopleController implements PeopleInputService {
  constructor(private readonly repository: PeopleOutputRepository) {}

  /**
   * Crear persona
   * @param event
   */
  async create(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    try {
      const createExampleDto = JSON.parse(event.body)
      const result = await this.repository.create(createExampleDto)
      return {
        success: true,
        message: "people created",
        result
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Listar personas
   * @param event
   */
  async findAll(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    try {
      const result = await this.repository.findAll()
      return {
        success: true,
        message: "people list",
        result
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Buscar persona
   * @param event
   */
  async findById(event: APIGatewayProxyEvent): Promise<ResponseToHandler> {
    try {
      const { id } = event.pathParameters
      const result = await this.repository.findById(parseInt(id))
      return {
        success: true,
        message: "people founded",
        result
      }
    } catch (e) {
      console.error(e)
    }
  }
}
