import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  private airportUri ='http://localhost:8080/flyaway/webapi/airports';

  constructor(private http:HttpClient, private router:Router) { }

  addAirport(airport: any){
    return this.http.post(this.airportUri,airport)
  }
  updateAirport(airport: any){
    return this.http.put(this.airportUri,airport)
  }

  deleteAirport(id: string){
    return this.http.delete(this.airportUri+"/"+id);
  }
  getAllAirports(){
    return this.http.get(this.airportUri)
  }
}
