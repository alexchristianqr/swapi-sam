import axios, { AxiosResponse, isAxiosError } from "axios"
import { HttpManagerOptions } from "./global.interface"

class ResponseError extends Error {
  private status: number | undefined
  private data?: unknown

  constructor(error: AxiosResponse | undefined) {
    super(error?.data.message)
    this.status = error?.status
    this.message = error?.data.message
    this.data = error?.data
  }
}

class HttpAdapterService {
  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl
  }

  async get(url: string, options: HttpManagerOptions = {}) {
    try {
      return axios.get(url)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async post<T>(url: string, data?: T | Record<string, unknown>, options: HttpManagerOptions = {}) {
    try {
      return await axios.post(url, data, {
        responseType: "json",
        headers: {
          ...options.headers
        }
      })
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }
}

export const httpAdapterService = new HttpAdapterService("https://swapi.py4e.com/api/")
