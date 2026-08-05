export interface Result {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: any[]
  metadata: Metadata
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
