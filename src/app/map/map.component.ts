import {Component, OnInit} from '@angular/core';
import { Map, Marker, Icon, tileLayer, polygon} from 'leaflet';
import { CarsService } from "../../services/cars.service";
import { ZonesService } from "../../services/zones.service";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../services/storage.service";

var myIconReplc = Icon.extend({
  options: {
    iconUrl: "https://cdn-icons-png.flaticon.com/512/75/75800.png",
    iconSize: [30,20],
    iconAnchor: [8, 30] // horizontal puis vertical
  }
});


export class Car {
  id!: number
  registration!: string
  brand!: string
  model!: string
  batteryLevel!: string
  active!: boolean
  rental!: boolean
  x: any
  y: any
}

class Zone {
  id!: number;
  geometry: any;
  color: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit{
  map!: Map;
  cars!: Car[];
  zones!: Zone[];

  constructor(private zonesService : ZonesService,
              private carsService: CarsService,
              public storageService: StorageService) {};


  ngOnInit() {
    this.getCars();
  }

  public getCars() {
    this.carsService.get_cars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        this.getZones();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getZones() {
    this.zonesService.get_zones().subscribe(
      (response: any) => {
        this.zones = response.zones;
        this.initializeMap();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  initializeMap() {
    this.map = new Map('map').setView([50.049683, 19.944544], 12);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    for (let i = 0; i < this.zones.length; i++){
        polygon(this.zones[i].geometry.coordinates[0], {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.5,
        }).addTo(this.map);
    }

    for (let i = 0; i < this.cars.length ; i++) {
      const marker = new Marker([this.cars[i].x, this.cars[i].y]).addTo(this.map);
      const brandAndModel = this.cars[i].brand + ' ' + this.cars[i].model;
      const registration = this.cars[i].registration
      const htmlRentComponent = `<a class="nav-link" href="rent/${this.cars[i].id}">Wynajmij</a>`;
      marker.bindPopup(brandAndModel + '</br>' + registration + '</br>' + htmlRentComponent);
      marker.setIcon(new myIconReplc)
    }
  }

}
