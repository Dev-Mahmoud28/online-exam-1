import { Observable } from "rxjs";
import { ConfirmEmailReq, EmailRes, RegisterReq, RegisterRes, SendEmailReq } from "../interfaces/register.interface";
import { LoginReq, LoginRes } from "../interfaces/login.interface";
import { ForgotPasswordReq, PasswordRes, ResetPasswordReq } from "../interfaces/forgot-password.interface";

export abstract class AuthApi{
    abstract sendEmail(data:SendEmailReq):Observable<EmailRes>;
    abstract confirmEmail(data:ConfirmEmailReq):Observable<EmailRes>;
    abstract register(data:RegisterReq):Observable<RegisterRes>;
    abstract login(data:LoginReq):Observable<LoginRes>;
    abstract forgotPassword(data:ForgotPasswordReq):Observable<PasswordRes>;
    abstract resetPassword(data:ResetPasswordReq):Observable<PasswordRes>;
}