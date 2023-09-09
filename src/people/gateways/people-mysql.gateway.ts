import { PeopleInterface } from "../people.interface"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { databaseService } from "../../shared/database.service"
import { PeopleEntity } from "../people.entity"
import { PeopleModel } from "../people.model"

class PeopleMysqlGateway implements PeopleInterface {
  async create(createPeopleDto: CreatePeopleDto): Promise<CreatePeopleDto> {
    const sql = `insert into people (nombre, anio_nacimiento, color_ojos, genero, color_pelo, altura, masa, color_piel, planeta, peliculas, especies, naves, vehiculos, url, fecha_creado, fecha_editado) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    return databaseService.insert(sql, createPeopleDto)
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

export const provider = new PeopleMysqlGateway()
