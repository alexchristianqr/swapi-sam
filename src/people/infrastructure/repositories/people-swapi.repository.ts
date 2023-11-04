import { httpAdapterService } from "../../../shared/services/http-adapter.service"
import { PeopleOutputRepository } from "../../domain/ports/people-output.repository"

export class PeopleSwapiRepository implements PeopleOutputRepository {
  private readonly url = `people`

  async create(data: any): Promise<any> {
    await httpAdapterService.post(this.url, data)
    return data
  }

  async findAll(): Promise<Array<any>> {
    const { data } = await httpAdapterService.get(this.url)
    return data?.results
  }

  async findById(id: number): Promise<any> {
    const { data } = await httpAdapterService.get(`${this.url}/${id}`)
    return data
  }
}
