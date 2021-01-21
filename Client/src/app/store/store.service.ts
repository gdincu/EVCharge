import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreParams } from '../shared/models/storeParams';
import { IPagination } from '../shared/models/pagination';

//Decorated with the Injectable decorator
@Injectable({
  //So that it is provided in the app module and initialised when the app starts
  providedIn: 'root'
})
export class StoreService {
  baseUrl = 'https://localhost:44313/';

  constructor(private http: HttpClient) { }

  //Method to return a booking based on id
  //getBooking(id: number) {
  //  return this.http.get<IBooking>(this.baseUrl + 'bookings/' + id);
  //}

  //Method to return bookings
  getBookings() {

    return this.http.get<IPagination>(this.baseUrl + 'bookings?pageindex=1&pagesize=10');

  }
}
