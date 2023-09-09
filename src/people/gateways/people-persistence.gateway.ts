import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleModel } from "../people.model"

class PeoplePersistenceGateway implements PeopleInterface {
  private items: Array<any> = []

  async create(createPeopleDto: CreatePeopleDto): Promise<any> {
    return this.items.push(createPeopleDto)
  }

  async findAll(): Promise<Array<PeopleModel>> {
    return this.items
  }

  findById(id: number): Promise<PeopleModel> {
    return Promise.resolve(undefined)
  }
}

export const provider = new PeoplePersistenceGateway()
