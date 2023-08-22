import { CreatePeopleDto } from "./dto/create-people.dto"
import { PeopleEntity } from "./people.entity"

export interface PeopleInterface {
  create(createExampleDto: CreatePeopleDto): Promise<CreatePeopleDto>
  findAll(): Promise<Array<PeopleEntity>>
}
