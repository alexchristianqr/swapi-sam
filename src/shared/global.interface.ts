import { AxiosRequestConfig } from "axios"

export interface ResponseToHandler {
  message: string | null
  result?: any
  success: boolean
}

export interface HttpManagerOptions {
  isPublic?: boolean
  headers?: Record<string, string>
  config?: AxiosRequestConfig
}
