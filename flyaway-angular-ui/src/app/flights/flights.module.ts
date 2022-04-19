import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { AirportsComponent } from './airports/airports.component';
import { CreateComponent } from './airports/create/create.component';
import { AirportsService } from './airports.service';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path:"", component: SearchComponent},
  { path:"detail", component: DetailsComponent},
  { path:"airports", children:[
    { path :"" ,component:AirportsComponent},
    { path :"create" ,component:CreateComponent}
  ]}
  
]

@NgModule({
  declarations: [DetailsComponent,SearchComponent, AirportsComponent, CreateComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers:[AirportsService]
})
export class FlightsModule { }
