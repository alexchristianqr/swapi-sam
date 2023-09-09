import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { PeopleEntity } from "../people.entity"
import { httpAdapterService } from "../../shared/http-adapter.service"
import { PeopleModel } from "../people.model"
import { translateService } from "../../shared/translate.service"

class PeopleSwapiGateway implements PeopleInterface {
  private url = `people`

  async create(createPeopleDto: CreatePeopleDto): Promise<any> {
    return httpAdapterService.post(this.url, createPeopleDto)
  }

  async findAll(): Promise<Array<PeopleEntity>> {
    const { data } = await httpAdapterService.get(this.url)
    return data?.results
  }

  async findById(id: number): Promise<PeopleModel> {
    const { data } = await httpAdapterService.get(`${this.url}/${id}`)
    let dataTranslated = await translateService.doTranslate(data)
    console.log({ dataTranslated })
    return new PeopleModel(dataTranslated)
  }
}

export const provider = new PeopleSwapiGateway()
