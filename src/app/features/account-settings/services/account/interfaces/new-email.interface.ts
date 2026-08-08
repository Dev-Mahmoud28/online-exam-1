export interface NewEmailReq {
  newEmail:string
}

export interface NewEmailRes {
  status: boolean
  code: number
  message: string
}

export interface ConfirmEmailReq{
  code:string
}

export interface ConfirmEmailRes {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  profilePhoto: any
  emailVerified: boolean
  phoneVerified: boolean
  role: string
  createdAt: string
  updatedAt: string
}
