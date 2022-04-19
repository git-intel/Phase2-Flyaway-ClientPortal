export class Flight {
  id: string;
  number: string;
  departure: any;
  destination: any;
  date_departure: Date;
  date_arrival: Date;
  time_departure: Date;
  time_arrival: Date;
  plane_id: string;
  pricesNormal: Number[];
  pricesVip: Number[];
  flightHierarchy: any[];
}
