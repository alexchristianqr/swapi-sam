import { PeopleEntity } from "./people.entity"

export class PeopleModel implements Partial<PeopleEntity> {
  constructor(payload: any) {
    return payload
  }
}
