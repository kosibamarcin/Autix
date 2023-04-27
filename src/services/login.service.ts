import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Data, Router} from "@angular/router";
import {User} from "../user/user";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  email = '';
  password = '';
  private header = new HttpHeaders();
  private refreshToken: any;
  loginUrl = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(payload: any) {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(payload) });
    return this.httpClient.post(this.loginUrl, payload);
  }


}
