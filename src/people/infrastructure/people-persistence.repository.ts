import { PeopleModel } from "../domain/people.model"
import { PeopleOutputRepository } from "../domain/ports/people-output.repository"

export class PeoplePersistenceRepository implements PeopleOutputRepository {
  private items: Array<any> = []

  async create(data: any): Promise<any> {
    return this.items.push(data)
  }

  async findAll(): Promise<Array<PeopleModel>> {
    return this.items
  }

  findById(id: number): Promise<PeopleModel> {
    return Promise.resolve(undefined)
  }
}
