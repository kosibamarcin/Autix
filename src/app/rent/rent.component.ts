import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RentService} from "../../services/rent.service";
import {Car} from "../map/map.component";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 0;
  timer1acc: boolean = true;
  timer2acc: boolean = false;
  isOver: boolean = false;
  timer: any;
  rentedCarId!: number;
  rentedCar!: Car;
  cost: string = '-';


  constructor(private router: Router, private rentService: RentService, public storageService: StorageService) {}

  ngOnInit(): void {
    const splittedUrl = this.router.url.split('/');
    this.rentedCarId = parseInt(splittedUrl[splittedUrl.length-1]);
    this.startRental();
  }

  startRental() {
    console.log(this.rentedCarId);
    this.rentService.rentCar(this.rentedCarId).subscribe(data => {
        this.rentedCar = (data as Car);
        this.timer1acc = false;
        this.timer2acc = true;
        this.timer = setInterval(() => {
          if (this.seconds < 59) {
            this.seconds++;
          } else {
            this.seconds = 0;
            this.minutes++;
          }
        }, 1000);
      },
      error => {
        console.log(error);
        alert("Unable to rent the car");
        this.router.navigate(['map']);
      })
  }

  endRental() {
    clearInterval(this.timer);
    this.timer2acc = false;
    this.isOver = true;

    this.rentService.returnCar(this.rentedCarId).subscribe(data => {
        const response = (data as RentalResponse);
        this.minutes = response.durationSeconds / 60;
        this.seconds = response.durationSeconds % 60;
        this.cost = response.cost.toString();
      },
      error => {
        alert("Unable to rent the car");
        this.router.navigate(['map']);
      })
  }

  returnToMap(){
    this.router.navigate(['map']);
  }


}

class RentalResponse {
  durationSeconds!: number;
  cost!: number;
}
