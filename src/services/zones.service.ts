import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Data, Router} from "@angular/router";
import {User} from "../user/user";
import {StorageService} from "./storage.service";

class Zone {
  id!: number
  polygon: any;
  color: any;
}

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private header = new HttpHeaders();
  private refreshToken: any;
  zonesUrl = 'http://localhost:8080/login';
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  get_zones(): Observable<Zone[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    // @ts-ignore
    return this.httpClient.get(this.zonesUrl, headers);
  }
}
