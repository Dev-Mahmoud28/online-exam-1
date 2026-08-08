import { inject, Injectable } from '@angular/core';
import { AccountApi } from './base/accountApi';
import { Observable } from 'rxjs';
import { DeleteAccount, ProfileReq, ProfileRes } from './interfaces/profile.interface';
import { HttpClient } from '@angular/common/http';
import { endPoints } from './enums/accountEndPoint';
import { ConfirmEmailReq, NewEmailReq, NewEmailRes, ConfirmEmailRes } from './interfaces/new-email.interface';
import { ChangePasswordReq, ChangePasswordRes } from './interfaces/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements AccountApi{
  private _httpClient = inject(HttpClient)

  getProfile(): Observable<ProfileRes> {
    return this._httpClient.get<ProfileRes>(endPoints.profile)
  }
  setNewProfile(data: ProfileReq): Observable<ProfileRes> {
    return this._httpClient.patch<ProfileRes>(endPoints.profile, data);
  }
  sendNewEmail(data: NewEmailReq): Observable<NewEmailRes> {
    return this._httpClient.post<NewEmailRes>(endPoints.emailReq, data);
  }
  confirmEmail(data: ConfirmEmailReq): Observable<ConfirmEmailRes> {
    return this._httpClient.post<ConfirmEmailRes>(endPoints.emailConfirm, data);
  }
  changePassword(data: ChangePasswordReq): Observable<ChangePasswordRes> {
    return this._httpClient.post<ChangePasswordRes>(endPoints.changePassword, data);
  }
  deleteAccount(): Observable<DeleteAccount> {
    return this._httpClient.delete<DeleteAccount>(endPoints.deleteAccount);
  }
}
