import { databaseService } from "../../../core/services/database.service"
import { PeopleModel } from "../../domain/people.model"
import { PeopleOutputRepository } from "../../domain/ports/people-output.repository"

export class PeopleMysqlRepository implements PeopleOutputRepository {
  async create(data: any): Promise<any> {
    const sql = `insert into people (nombre, anio_nacimiento, color_ojos, genero, color_pelo, altura, masa, color_piel, planeta, peliculas, especies, naves, vehiculos, url, fecha_creado, fecha_editado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    return databaseService.insert(sql, data)
  }

  async findAll(): Promise<Array<PeopleModel>> {
    const sql = `select * from people`
    return databaseService.select(sql)
  }

  async findById(id: number): Promise<PeopleModel> {
    const sql = `select * from people where id = ?`
    return databaseService.select(sql, [id])
  }
}
