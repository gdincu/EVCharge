import { Injectable } from '@angular/core';
import { IBooking } from '../shared/models/booking';
import { IChargingPoint, IChargingPointToCreate } from '../shared/models/chargingPoint';
import { IUser } from '../shared/models/user';
import { PaginationBooking, IPaginationBooking } from '../shared/models/paginationBooking';
import { BookingParams } from '../shared/models/bookingParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'https://localhost:5001/';
  bookings: IBooking[] = [];
  chargingPoints: IChargingPoint[] = [];
  users: IUser[] = [];
  chargingPointLocations: IChargingPointLocation[] = [];
  chargingPointTypes: IChargingPointType[] = [];
  pagination = new PaginationBooking();
  bookingParams = new BookingParams();

  constructor(private http: HttpClient) {
  }

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

    if (this.bookingParams.search) {
      params = params.append('search', this.bookingParams.search);
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

  getBooking(id: number) {
    const booking = this.bookings.find(p => p.id === id);

    if (booking) {
      return of(booking);
    }

    return this.http.get<IBooking>(this.baseUrl + 'bookings/' + id);
  }

  getBookingParams() {
    return this.bookingParams;
  }

  setBookingParams(params: BookingParams) {
    this.bookingParams = params;
  }

  getChargingPointTypes() {
    return this.http.get<IChargingPointType[]>(this.baseUrl + 'ChargingPointTypes').pipe(
      map(response => {
        this.chargingPointTypes = response;
        return response;
      })
    );
  }

  getChargingPointLocations() {
    return this.http.get<IChargingPointLocation[]>(this.baseUrl + 'ChargingPointLocations').pipe(
      map(response => {
        this.chargingPointLocations = response;
        return response;
      })
    );
  }

  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl + 'account/all').pipe(
      map(response => {
        this.users = response;
        return response;
      })
    );
  }
}
