import { Injectable } from '@angular/core';
import { Login, LoginRes } from '../interfaces/login.interface';
import { Adaptor } from '../interfaces/adaptor.interface';

@Injectable({
  providedIn: 'root',
})
export class AdaptorService implements Adaptor{

  adapt(data:Login):LoginRes{
    return {
      firstname: data.payload.user.firstName,
      email: data.payload.user.email,
      token: data.payload.token
    }
  }
}
