import { CreatePeopleDto } from "./dto/create-people.dto"
import { PeopleEntity } from "./people.entity"

export interface PeopleInterface {
  create(createPeopleDto: CreatePeopleDto): Promise<any>
  findAll(): Promise<Array<PeopleEntity>>
}
