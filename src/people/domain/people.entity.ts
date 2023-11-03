export interface PeopleEntity {
  nombre: string
  anio_nacimiento: string
  color_ojos: string
  genero: string
  color_pelo: string
  altura: string
  masa: string
  color_piel: string
  planeta: string
  peliculas: Array<any> | string
  especies: Array<any> | string
  naves: Array<any> | string
  vehiculos: Array<any> | string
  url: string
  fecha_creado: Date | string
  fecha_editado: Date | string
}
