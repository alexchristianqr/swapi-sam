const yaml = require("js-yaml")
const path = require("path")
const fs = require("fs")
const args = require("yargs").argv

if (!args.template) {
  throw new Error("Not found template parameter. Use --template=")
}

function loadTemplateSAM() {
  try {
    // Obtener el argumento
    const fileName = args.template

    // Crear el archivo template.yml
    let yamlContent = yaml.dump(fs.readFileSync(path.join(__dirname, `aws/templates/${fileName}.yml`), "utf8").toString())

    // Cargar el archivo template.yml
    let yamlFormatContent = yaml.load(yamlContent, { lineWidth: 150 })

    // Formatear el archivo template.yml a UTF8
    fs.writeFileSync(path.join(__dirname, "template.yml"), yamlFormatContent, "utf8")

    // Logger response
    console.log(`El template.yml se ha generado correctamente...`)
  } catch (e) {
    // Logger response
    console.error(e)
  }
}
loadTemplateSAM()
