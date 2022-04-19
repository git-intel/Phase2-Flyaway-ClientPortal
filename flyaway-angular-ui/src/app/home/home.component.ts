import { Component, OnInit, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingInformation } from '../models/booking-info';
import { Subject, Observable } from 'rxjs';
import { Flights } from '../models/flights';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});
  private search$ = new Subject<BookingInformation>();
  private flights$: Observable<Flights[]> | undefined;

  refineSearch = new FormControl();
  isFormValid: boolean = false;
  filteredOriginCities: string[] = []
  filteredDestinationCities: string[] = [];
  totalCitiesListedOnServer: string[] = [];
  search: BookingInformation;
  submitted = false;

  constructor(private find: SearchService, private elementRef: ElementRef, private fb: FormBuilder) {
    this.search = {
      departureDate: '',
      destinationCity: '',
      originCity: '',
      oneway: false,
      passengers: 0,
      refine: 1000
    }
  }

  ngOnInit() {
    //Get all the cities available on initialization of component.
    this.searchForm = this.fb.group({
      originCity: ['', Validators.required],
      destinationCity: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      passengers: [1, Validators.required],
      refine: [100]
    });

    this.find.getCitiesListedOnServer()
      // .take(1)
      .subscribe(
        (cities: string[]) => {
          this.totalCitiesListedOnServer = cities;
          // console.log("Total Cities", this.totalCitiesListedOnServer)
        },
        (err: any) => {
          <any>window.alert("It seems you are directly serving from file. The app would not be able to perform perfectly due to Cross origin restriction.");
        }
      )

    this.flights$ = this.search$.pipe(
      distinctUntilChanged(),
      switchMap(booking => this.find.searchFlightAvailability(booking))
    )

    this.searchForm.controls.originCity.valueChanges.pipe(
      debounceTime(200), distinctUntilChanged())
      .subscribe(key => this.filterCity(key, true));
    this.searchForm.controls.destinationCity.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(key => this.filterCity(key, false))
    console.log("search form", this.searchForm)
  }

  // getter for form controls
  get f() { return this.searchForm.controls; }

  /**
   * Selected value from list
   * @param city 
   */
  public valueSelected(city: string, isOrigin: boolean) {
    console.log("selected", city)
    isOrigin ? this.f.originCity.setValue(city, { emitEvent: false }) : this.f.destinationCity.setValue(city, { emitEvent: false });
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
  }

  /**
   * Filter cities based on user input
   */
  public filterCity(city: string, isOrigin: boolean) {
    city = city.toLowerCase(); // convert to lowercase
    isOrigin ? this.filteredOriginCities = [] : this.filteredDestinationCities = [];
    // console.log("city entered", city);
    if (city) {
      this.totalCitiesListedOnServer.filter((x) => {
        if (x.includes(city))
          isOrigin ? this.filteredOriginCities.push(x) : this.filteredDestinationCities.push(x);
      });
    }
  }

  /**
   * Check validation of form and proceed for search
   * @param formInputs 
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return
    }
    console.log(this.searchForm.value);
  }

  /**
  * 
  * Updates the booking type i.e one way/ two way flight.
  * @param oneway 
  */
  public updateBookingType(oneway: boolean): void {
    this.search.oneway = oneway;
  }


}
