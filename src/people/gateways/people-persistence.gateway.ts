import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleEntity } from "../people.entity"

class PeoplePersistenceGateway implements PeopleInterface {
  private items: Array<any> = []

  async create(createExampleDto: CreatePeopleDto): Promise<CreatePeopleDto> {
    return this.items.push(createExampleDto)
  }

  async findAll(): Promise<Array<PeopleEntity>> {
    return this.items
  }
}

export const provider = new PeoplePersistenceGateway()
