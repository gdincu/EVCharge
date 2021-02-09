import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBooking } from '../shared/models/booking';
import { IChargingPoint, ProductFormValues, IChargingPointToCreate } from '../shared/models/chargingPoint';
import { BookingParams } from '../shared/models/bookingParams';
import { PaginationBooking, IPaginationBooking } from '../shared/models/paginationBooking';
import { StoreParams } from '../shared/models/storeParams';
import { Pagination, IPagination } from '../shared/models/pagination';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:5001/';
  users: IUser[] = [];
  bookings: IBooking[] = [];
  chargingPoints: IChargingPoint[] = [];
  chargingPointTypes: IChargingPointType[] = [];
  chargingPointLocations: IChargingPointLocation[] = [];
  paginationBooking = new PaginationBooking();
  paginationChargingPoint = new Pagination();
  bookingParams = new BookingParams();
  storeParams = new StoreParams();

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

  getBookings(useCache: boolean) {
    if (useCache === false) {
      this.bookings = [];
    }

    if (this.bookings.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.bookings.length / this.bookingParams.pageSize);

      if (this.bookingParams.pageNumber <= pagesReceived) {
        this.paginationBooking.data =
          this.bookings.slice((this.bookingParams.pageNumber - 1) * this.bookingParams.pageSize,
            this.bookingParams.pageNumber * this.bookingParams.pageSize);

        return of(this.paginationBooking);
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
          this.paginationBooking = response.body;
          return this.paginationBooking;
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

  getBookingParams() {
    return this.bookingParams;
  }

  setBookingParams(params: BookingParams) {
    this.bookingParams = params;
  }

  getChargingPoints() {
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

  updateChargingPoint(chargingPoint: IChargingPointToCreate) {
    return this.http.put(this.baseUrl + 'ChargingPoints/' + chargingPoint.id, chargingPoint);
  }

  createChargingPoint(product: ProductFormValues) {
    return this.http.post(this.baseUrl + 'ChargingPoints', product);
  }

  getChargingPointTypes() {
    return this.http.get<IChargingPointType[]>(this.baseUrl + 'ChargingPointTypes').pipe(
      map(response => {
        this.chargingPointTypes = response;
        return response;
      })
    );
  }

  removeChargingPointType(id: number) {
    return this.http.delete(this.baseUrl + 'ChargingPointTypes/' + id).subscribe();
  }

  updateChargingPointType(chargingPointType: IChargingPointType) {
    return this.http.put(this.baseUrl + 'ChargingPointTypes/' + chargingPointType.id, chargingPointType);
  }

  createChargingPointType(chargingPointType: IChargingPointType) {
    return this.http.post(this.baseUrl + 'ChargingPointTypes', chargingPointType);
  }

  getChargingPointLocations() {
    return this.http.get<IChargingPointLocation[]>(this.baseUrl + 'ChargingPointLocations').pipe(
      map(response => {
        this.chargingPointLocations = response;
        return response;
      })
    );
  }

  removeChargingPointLocation(id: number) {
    return this.http.delete(this.baseUrl + 'ChargingPointLocations/' + id).subscribe();
  }

  updateChargingPointLocation(chargingPointLocation: IChargingPointLocation) {
    return this.http.put(this.baseUrl + 'ChargingPointLocations/' + chargingPointLocation.id, chargingPointLocation);
  }

  createChargingPointLocation(chargingPointLocation: IChargingPointLocation) {
    return this.http.post(this.baseUrl + 'ChargingPointLocations', chargingPointLocation);
  }
}
