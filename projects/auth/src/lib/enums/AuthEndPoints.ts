
const BaseUrl = 'https://exam-app.elevate-bootcamp.cloud/api/auth' as const

export default class EndPoints{
    static readonly LOGIN = `${BaseUrl}/login`;
    static readonly REGISTER = `${BaseUrl}/register`;
    static readonly FORGOTPASSWORD = `${BaseUrl}/forgot-password`;
    static readonly RESERPASSWORD = `${BaseUrl}/reset-password`;
    static readonly SENDEMAIL = `${BaseUrl}/send-email-verification`;
    static readonly CONFIRMEMAIL = `${BaseUrl}/confirm-email-verification`;
}