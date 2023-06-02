import { Component } from '@angular/core';
import {ZonesService} from "../../services/zones.service";
import {CarsService} from "../../services/cars.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private zonesService : ZonesService,
              private carsService: CarsService, public storageService: StorageService,
              private router: Router) {};

  logout() {
    this.storageService.removeJwt();
    this.router.navigate(['/signup']);
  }


}
