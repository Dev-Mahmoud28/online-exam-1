
export interface DiplomasRes {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: Diplomas[]
  metadata: Metadata
}

export interface Diplomas {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
