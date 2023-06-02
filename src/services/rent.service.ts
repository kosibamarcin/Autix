import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Car} from "../app/map/map.component";

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private baseUrl = `http://localhost:8080/vehicles/`;
  private carToRent?: Car;
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  rentCar(carId: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    const options = { headers: headers };
    const rentUrl = this.baseUrl + carId + '/rental';
    return this.httpClient.post(rentUrl, {}, options);
  }

  returnCar(carId: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    const options = { headers: headers };
    const returnUrl = this.baseUrl + carId + '/return';
    return this.httpClient.post(returnUrl, {},  options);
  }

  setCarToRent(car: Car) {
    this.carToRent = car;
  }

  getCarToRent() {
    return this.carToRent;
  }

}
