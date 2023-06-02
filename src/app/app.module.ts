import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { MapComponent } from './map/map.component';
import {MapsModule} from "@syncfusion/ej2-angular-maps";
import { RentComponent } from './rent/rent.component';
import { HomeComponent } from './home/home.component';

const appRoute: Routes = [
  {path : '',redirectTo : 'signup',pathMatch : 'full'},
  {path: 'signup', component: SignUpComponent },
  {path: 'login', component: SignInComponent },
  {path: 'map', component: MapComponent },
  {path: 'home', component: HomeComponent },
  {path: '**', component: RentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    MapComponent,
    RentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    MapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
