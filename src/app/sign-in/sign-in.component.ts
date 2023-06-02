import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  invalidLogin = false;
  isLoggedIn = false;

  constructor(private loginService: LoginService,
              private router: Router,
              public storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn() && this.invalidLogin) {
      this.isLoggedIn = true;
    }
  }

  login() {
    let payload = {username: this.email, password: this.password};
    this.loginService.login(payload).subscribe(data => {
        this.storageService.saveJwt(data);
        this.router.navigate(['/map']);
        this.invalidLogin = false;
        this.isLoggedIn = true;
      },
      error => {
        this.invalidLogin = true;
        console.log(error);
        alert("bad credentials");
      })
  }





}

