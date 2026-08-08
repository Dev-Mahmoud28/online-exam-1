export interface ProfileReq {
  firstName:string,
  lastName:string,
  profilePhoto:string,
  phone:string
}

export interface ProfileRes {
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

export interface DeleteAccount{
    "status":boolean,
    "code":number,
    "message":string
}