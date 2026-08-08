import { Observable } from "rxjs";
import { DeleteAccount, ProfileReq, ProfileRes } from "../interfaces/profile.interface";
import { ChangePasswordReq, ChangePasswordRes } from "../interfaces/change-password.interface";
import { ConfirmEmailReq, ConfirmEmailRes, NewEmailReq, NewEmailRes } from "../interfaces/new-email.interface";

export abstract class AccountApi{
    abstract getProfile():Observable<ProfileRes>
    abstract setNewProfile(data:ProfileReq):Observable<ProfileRes>
    abstract changePassword(data:ChangePasswordReq):Observable<ChangePasswordRes>
    abstract sendNewEmail(data:NewEmailReq):Observable<NewEmailRes>
    abstract confirmEmail(data:ConfirmEmailReq):Observable<ConfirmEmailRes>
    abstract deleteAccount():Observable<DeleteAccount>
}