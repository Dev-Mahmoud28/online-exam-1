export interface LoginReq {
    username:string;
    password:string
}

export interface LoginRes {
  firstname:string;
  email:string;
  token:string;
}

export interface Login {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  user: User
  token: string
}

export interface User {
  id: string
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  emailVerified: boolean
  phoneVerified: boolean
  role: string
}
