import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBooking } from '../shared/models/booking';
import { IChargingPoint } from '../shared/models/chargingPoint';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:5001/';
  users: IUser[] = [];
  bookings: IBooking[] = [];
  chargingPoints: IChargingPoint[] = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl + 'account/all').pipe(
      map(response => {
        this.users = response;
        return response;
      })
    );
  }

  removeUser(userEmail: string) {
    return this.http.delete(this.baseUrl + 'account/deletebyemail?email=' + userEmail).subscribe();
  }

  getBookings() {
    return this.http.get<IBooking[]>(this.baseUrl + 'Bookings/all').pipe(
      map(response => {
        this.bookings = response;
        return response;
      })
    );
  }

  removeBooking(bookingId: number) {
    return this.http.delete(this.baseUrl + 'Bookings/' + bookingId).subscribe();
  }

  updateBooking(booking: IBooking): Observable<IBooking> {
    const url = `${this.baseUrl}Bookings/${booking.id}`;
    return this.http
      .put<IBooking>(url, booking);
  }

  getAllChargingPoints() {
    return this.http.get<IChargingPoint[]>(this.baseUrl + 'ChargingPoints/all').pipe(
      map(response => {
        this.chargingPoints = response;
        return response;
      })
    );
  }

  removeChargingPoint(chargingPointId: number) {
    return this.http.delete(this.baseUrl + 'ChargingPoints/' + chargingPointId).subscribe();
  }

}
