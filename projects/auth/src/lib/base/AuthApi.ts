import { Observable } from "rxjs";

export abstract class AuthApi{
    abstract sendEmail(data:any):Observable<any>;
    abstract confirmEmail(data:any):Observable<any>;
    abstract register(data:any):Observable<any>;
    abstract login(data:any):Observable<any>;
    abstract forgotPassword(data:any):Observable<any>;
    abstract resetPassword(data:any):Observable<any>;
}