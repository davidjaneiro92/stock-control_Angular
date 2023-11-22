import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { authRequest } from 'src/app/moduls/interfaces/user/auth/authRequest';
import { AuthRespose } from 'src/app/moduls/interfaces/user/auth/authResponse';
import { siginuoUserResponse } from 'src/app/moduls/interfaces/user/siginuoUserResponse';
import { environments } from 'src/environments/environments';
import { signuoUserRequest } from './../../moduls/interfaces/user/siginuoUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environments.API_URL
  constructor(private http: HttpClient, private cookies: CookieService) { }

  signupUser(requestData: signuoUserRequest): Observable<siginuoUserResponse> {
    console.log(requestData)
    return this.http.post<siginuoUserResponse>(
      `${this.API_URL}/user`,
      requestData
    )
  }
  authuser(requestData: authRequest): Observable<AuthRespose> {
    return this.http.post<AuthRespose>(`${this.API_URL}/auth`,requestData)
  }

  isLoggedIn(): boolean{
const JWT_TOKEN = this.cookies.get('USER_INFO');
return JWT_TOKEN ? true : false;
  }
}
