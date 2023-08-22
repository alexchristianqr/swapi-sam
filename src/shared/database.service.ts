import { createConnection, Connection } from "mysql2/promise"

class DatabaseService {
  async connect(): Promise<Connection> {
    try {
      return createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PWD
      })
    } catch (error) {
      throw new Error("No se puede conectar a la BD MySQL")
    }
  }

  async select(sql: string): Promise<any> {
    const db = await this.connect()
    const [rows, fields] = await db.query(sql)
    return rows
  }

  async insert(sql: string, values: any): Promise<any> {
    const db = await this.connect()
    return db.query(sql, Object.values(values))
  }
}

export const databaseService = new DatabaseService()
