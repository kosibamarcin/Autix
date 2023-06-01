import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  zonesUrl = 'http://localhost:8080/zones';
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }
  get_zones(): any {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storageService.getEncodedToken() });
    const options = { headers: headers };
    return this.httpClient.get(this.zonesUrl, options);
  }
}
