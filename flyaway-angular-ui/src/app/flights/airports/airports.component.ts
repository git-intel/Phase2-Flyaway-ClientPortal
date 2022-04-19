import { Component, OnInit } from '@angular/core';
import { AirportsService } from '../airports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  constructor(private airportSrv:AirportsService,private router:Router) { }
  public airports:any;

  ngOnInit(): void {
    this.airportSrv.getAllAirports().subscribe(res=>{
      console.log(res);  
      this.airports = res;   
    },err=>{
      console.log(err);      
    })
  }
  
  addAirport(){
    this.router.navigateByUrl("/flights/airports/create")
  }
}
