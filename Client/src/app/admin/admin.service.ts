import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBooking } from '../shared/models/booking';
import { IChargingPoint } from '../shared/models/chargingPoint';
import { BookingParams } from '../shared/models/bookingParams';
import { PaginationBooking, IPaginationBooking } from '../shared/models/paginationBooking';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:5001/';
  users: IUser[] = [];
  bookings: IBooking[] = [];
  chargingPoints: IChargingPoint[] = [];
  pagination = new PaginationBooking();
  bookingParams = new BookingParams();

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

  //getBookings() {
  //  return this.http.get<IBooking[]>(this.baseUrl + 'Bookings/all').pipe(
  //    map(response => {
  //      this.bookings = response;
  //      return response;
  //    })
  //  );
  //}

  getBookings(useCache: boolean) {
    if (useCache === false) {
      this.bookings = [];
    }

    if (this.bookings.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.bookings.length / this.bookingParams.pageSize);

      if (this.bookingParams.pageNumber <= pagesReceived) {
        this.pagination.data =
          this.bookings.slice((this.bookingParams.pageNumber - 1) * this.bookingParams.pageSize,
            this.bookingParams.pageNumber * this.bookingParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.bookingParams.start) {
      params = params.append('StartDate', this.bookingParams.start.toString());
    }

    if (this.bookingParams.end) {
      params = params.append('EndDate', this.bookingParams.end.toString());
    }

    params = params.append('sort', this.bookingParams.sort);
    params = params.append('pageIndex', this.bookingParams.pageNumber.toString());
    params = params.append('pageSize', this.bookingParams.pageSize.toString());

    return this.http.get<IPaginationBooking>(this.baseUrl + 'bookings', { observe: 'response', params })
      .pipe(
        map(response => {
          this.bookings = [...this.bookings, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
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

  getBookingParams() {
    return this.bookingParams;
  }

  setBookingParams(params: BookingParams) {
    this.bookingParams = params;
  }

}
