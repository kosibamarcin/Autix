import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {LoginService} from "./login.service";
import {User} from "../user/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/users";
  private header = new HttpHeaders();
  private token: any;

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private loginService: LoginService) { }

  private setHeader() {
    this.token = this.storageService.getEncodedToken().accessToken;
    this.header = this.header.set('Authorization', 'Bearer ' + this.token);
    console.log(this.header);
  }

  public getUsers() {
    this.setHeader();
    return this.http.get<User[]>(this.apiUrl, {'headers': this.header})
  }

  public editUser(userId: string): Observable<void> {
    this.setHeader();
    return this.http.put<void>(`${this.apiUrl}/${userId}`, {'headers': this.header});
  }

}
