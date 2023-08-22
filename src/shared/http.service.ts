import axios, { AxiosResponse, isAxiosError, AxiosRequestConfig } from "axios"

interface HttpManagerOptions {
  isPublic?: boolean
  headers?: Record<string, string>
  config?: AxiosRequestConfig
}

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

class HttpService {
  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl
  }

  getHTTPClient(options?: HttpManagerOptions) {
    return axios
  }

  async get(url: string, options: HttpManagerOptions = {}) {
    try {
      return this.getHTTPClient(options).get(url)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async post<T>(url: string, data?: T | Record<string, unknown>, options: HttpManagerOptions = {}) {
    try {
      return await this.getHTTPClient(options).post(url, data, {
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

// export const httpService = new HttpService(process.env.BASE_API_URL)
export const httpService = new HttpService("https://swapi.py4e.com/api/")
