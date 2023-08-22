import { CreatePeopleDto } from "./dto/create-people.dto"
import { PeopleEntity } from "./people.entity"
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { provider } from "./gateways/people-persistence.gateway"

class PeopleService {
  create(event: APIGatewayProxyEvent): Promise<CreatePeopleDto> {
    const createExampleDto = JSON.parse(event.body)
    return provider.create(createExampleDto)
  }

  findAll(event: APIGatewayProxyEvent): Promise<Array<PeopleEntity>> {
    return provider.findAll()
  }
}

export const peopleService = new PeopleService()
