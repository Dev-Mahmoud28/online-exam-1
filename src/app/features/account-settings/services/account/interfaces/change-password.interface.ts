export interface ChangePasswordReq {
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;
}

export interface ChangePasswordRes {
  status: boolean
  code: number
  message: string
}