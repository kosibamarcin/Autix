import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  carsUrl = 'http://localhost:8080/vehicles';
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  get_cars(): any {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    const options = { headers: headers };
    return this.httpClient.get(this.carsUrl, options);
  }
}
