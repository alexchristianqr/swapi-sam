import { CreatePeopleDto } from "./dto/create-people.dto"
import { PeopleEntity } from "./people.entity"
import { PeopleModel } from "./people.model"

export interface PeopleInterface {
  create(createPeopleDto: CreatePeopleDto): Promise<any>
  findAll(): Promise<Array<PeopleModel>>
  findById(id: number): Promise<PeopleModel>
}
