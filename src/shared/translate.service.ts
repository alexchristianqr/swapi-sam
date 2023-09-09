import * as AWS from "aws-sdk"
import { Translate } from "aws-sdk"

class TranslateService {
  translate: Translate = null

  constructor() {
    this.translate = new AWS.Translate()
  }

  async doTranslate(dataText: any) {
    console.log({ dataText })
    if (!dataText) throw new Error("Error")

    let params = {
      Text: JSON.stringify(dataText),
      SourceLanguageCode: "en",
      TargetLanguageCode: "es"
    }

    this.translate.translateText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        throw new Error("Error calling Amazon Translate. " + err.message)
      }
      if (data) {
        console.log({ data })
        return data.TranslatedText
      }
    })
  }
}

export const translateService = new TranslateService()
