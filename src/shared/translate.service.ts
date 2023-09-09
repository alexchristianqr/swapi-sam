import * as AWS from "aws-sdk"
// import { Translate } from "aws-sdk"

class TranslateService {
  public translate: AWS.Translate = null

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

    return this.translate.translateText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        throw new Error("Error calling Amazon Translate. " + err.message)
      }
      console.log({ data })
      if (data) {
        return data.TranslatedText
      }
    })
  }
}

export const translateService = new TranslateService()
