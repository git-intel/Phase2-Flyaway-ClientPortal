import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  { path:"flights", loadChildren:()=> import('./flights/flights.module').then(m => m.FlightsModule)},
  { path:"booking", loadChildren:()=> import('./booking/booking.module').then(m => m.BookingModule)},
  { path:"auth", loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
