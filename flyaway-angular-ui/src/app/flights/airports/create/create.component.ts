import { Component, OnInit } from '@angular/core';
import { AirportsService } from '../../airports.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private airportSrv:AirportsService,private router:Router) { }

  airportForm = new FormGroup({
    name: new FormControl(''),
    iataCode: new FormControl(''),
    countryIsoCode: new FormControl(''),
    address: new FormControl('')   
  });
  
  ngOnInit(): void {

  }

  public addAirport(){
    this.airportSrv.addAirport(this.airportForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl("/flights/airports")
    },err=>{
      console.log(err);
    })
  }
}
