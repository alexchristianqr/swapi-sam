import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleEntity } from "../people.entity"
import { httpService } from "../../shared/http.service"

class PeopleSwapiGateway implements PeopleInterface {
  private url = `people`

  async create(createPeopleDto: CreatePeopleDto): Promise<any> {
    return httpService.post(this.url, createPeopleDto)
  }

  async findAll(): Promise<Array<PeopleEntity>> {
    const { data } = await httpService.get(this.url)
    return data?.results
  }
}

export const provider = new PeopleSwapiGateway()
