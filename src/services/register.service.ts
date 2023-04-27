import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl="http://localhost:8080/signup";

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}`,user);
  }
}
