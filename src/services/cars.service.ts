import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Data, Router} from "@angular/router";
import {User} from "../user/user";
import {StorageService} from "./storage.service";

class Car {
  id!: number
  name!: string
  coordinates: any
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private header = new HttpHeaders();
  private refreshToken: any;
  carsUrl = 'http://localhost:8080/login';
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  get_cars(): Observable<Car[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    // @ts-ignore
    return this.httpClient.get(this.carsUrl, headers);
  }
}
