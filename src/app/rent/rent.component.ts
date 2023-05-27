import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent {
  constructor(private router: Router) { }
  minutes: number = 0;
  seconds: number = 0;
  timer1acc: boolean = true;
  timer2acc: boolean = false;
  isOver: boolean = false;
  timer: any;

  startTimer() {
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
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer2acc = false;
    this.isOver = true;
  }

  zakoncz(){
    this.router.navigate(['map']);
  }


}
