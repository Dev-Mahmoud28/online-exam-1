import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { map, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import EndPoints from './enums/AuthEndPoints';
import { ConfirmEmailReq, EmailRes, RegisterReq, RegisterRes, SendEmailReq } from './interfaces/register.interface';
import { Login, LoginReq, LoginRes } from './interfaces/login.interface';
import { ForgotPasswordReq, PasswordRes, ResetPasswordReq } from './interfaces/forgot-password.interface';
import { AdaptorService } from './adaptor/adaptor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi{
  
  private readonly _httpclient = inject(HttpClient);
  private readonly _adaptorService = inject(AdaptorService)

   sendEmail(data: SendEmailReq): Observable<EmailRes> {
    return this._httpclient.post<EmailRes>(EndPoints.SENDEMAIL, data);
  }
   confirmEmail(data: ConfirmEmailReq): Observable<EmailRes> {
    return this._httpclient.post<EmailRes>(EndPoints.CONFIRMEMAIL, data);
  }
   register(data: RegisterReq): Observable<RegisterRes> {
    return this._httpclient.post<RegisterRes>(EndPoints.REGISTER, data);
  }
   login(data: LoginReq): Observable<LoginRes> {
    return this._httpclient.post<Login>(EndPoints.LOGIN, data)
    .pipe(map((res:Login)=> this._adaptorService.adapt(res)));
  }
   forgotPassword(data: ForgotPasswordReq): Observable<PasswordRes> {
    return this._httpclient.post<PasswordRes>(EndPoints.FORGOTPASSWORD, data);
  }
   resetPassword(data: ResetPasswordReq): Observable<PasswordRes> {
    return this._httpclient.post<PasswordRes>(EndPoints.RESERPASSWORD, data);
  }
  
}
