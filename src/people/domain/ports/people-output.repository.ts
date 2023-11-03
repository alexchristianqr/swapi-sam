export abstract class PeopleOutputRepository {
  abstract create(data: any): Promise<any>
  abstract findById(id: number): Promise<any | null>
  abstract findAll(): Promise<Array<any>>
}
