import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleEntity } from "../people.entity"
import { httpService } from "../../shared/http.service"

class PeopleSwapiGateway implements PeopleInterface {
  private url = `people`

  async create(createExampleDto: CreatePeopleDto): Promise<CreatePeopleDto> {
    return httpService.post(this.url, {})
  }

  async findAll(): Promise<Array<PeopleEntity>> {
    const { data } = await httpService.get(this.url)
    console.log({ data })
    return data?.results
  }
}

export const provider = new PeopleSwapiGateway()
