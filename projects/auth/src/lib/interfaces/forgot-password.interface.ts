export interface ForgotPasswordReq {
    email: string
    redirectUrl: string
}

export interface ResetPasswordReq {
    token: string
    newPassword: string
    confirmPassword: string
}

export interface PasswordRes {
    status: boolean
    code: number
    message: string
}
