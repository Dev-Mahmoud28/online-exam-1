export interface RegisterReq {
  username:string;
  email:string;
  password:string;
  confirmPassword:string; 
  firstName:string;
  lastName:string;
  phone:string;
}

export interface RegisterRes {
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
  createdAt: string
}


export interface SendEmailReq {
    email:string;
}

export interface EmailRes {
    status:boolean;
    code:number;
    message:string;
}

export interface ConfirmEmailReq {
    email:string;
    code:string;
}