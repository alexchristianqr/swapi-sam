import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleEntity } from "../people.entity"
import { httpAdapterService } from "../../shared/http-adapter.service"

class PeopleSwapiGateway implements PeopleInterface {
  private url = `people`

  async create(createPeopleDto: CreatePeopleDto): Promise<any> {
    return httpAdapterService.post(this.url, createPeopleDto)
  }

  async findAll(): Promise<Array<PeopleEntity>> {
    const { data } = await httpAdapterService.get(this.url)
    return data?.results
  }
}

export const provider = new PeopleSwapiGateway()
