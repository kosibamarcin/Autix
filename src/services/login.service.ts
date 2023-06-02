import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient) { }

  login(payload: any) {
    return this.httpClient.post(this.loginUrl, payload);
  }


}
