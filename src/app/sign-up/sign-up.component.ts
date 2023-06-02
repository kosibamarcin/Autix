import { Component, OnInit } from '@angular/core';
import {User} from "../../user/user";
import {RegisterService} from "../../services/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user:User =new User();
  // @ts-ignore
  userError: User;
  isCreated:boolean = false;
  passwordsDifferent:boolean = true;


  constructor(private registerService: RegisterService, private router: Router) { }

  register(){
    this.comparePasswords();
    this.registerService.registerUser(this.user).subscribe(data=>{
      this.user = new User();
      this.isCreated = true;
      alert("Registered successfully")
      this.router.navigate(['/login'])
    },error=> {
      console.log(error);
      if (error.status == 409) {
        alert("There is already created user with same username or email");
      }
      if (error.status == 400) {
        alert("Please fill all empty fields");
      }
      this.userError=error.error;
      this.isCreated = false;
    });
  }

  comparePasswords() {
    var password = (document.getElementById("password") as HTMLInputElement).value;
    var repeatPassword = (document.getElementById("password1") as HTMLInputElement).value;
    if (password != repeatPassword) {
      this.passwordsDifferent = false;
    }

  }

  ngOnInit(): void {
  }

}

