import { Injectable } from '@angular/core';
import { IBooking } from '../shared/models/booking';
import { IChargingPoint, IChargingPointToCreate } from '../shared/models/chargingPoint';
import { IUser, IUserToReturn } from '../shared/models/user';
import { PaginationBooking, IPaginationBooking } from '../shared/models/paginationBooking';
import { BookingParams } from '../shared/models/bookingParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = 'https://localhost:5001/';
  bookings: IBooking[] = [];
  chargingPoints: IChargingPoint[] = [];
  users: IUser[] = [];
  tempId: string;
  chargingPointLocations: IChargingPointLocation[] = [];
  chargingPointTypes: IChargingPointType[] = [];
  pagination = new PaginationBooking();
  bookingParams = new BookingParams();
  currentUserEmail: string;
  currentUserId: string;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {  }

  getBookings(useCache: boolean) {
    if (useCache === false) {
      this.bookings = [];
    }

    this.accountService.currentUser$.subscribe(x => this.currentUserEmail = x.email);
    //console.log(this.currentUserEmail);
    this.getUsers().subscribe(x => this.currentUserId = x.find(y => y.email == this.currentUserEmail).id);
    //console.log(this.currentUserId);

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
          //ok console.log(params);
          //ok console.log(this.currentUserId);
          //ok console.log(response.body.data);
          this.bookings = [...this.bookings, ...response.body.data.filter(x => x.userId == this.currentUserId)];
          //ok console.log(this.bookings);
          response.body.data = this.bookings;
          this.pagination = response.body;
          console.log(this.pagination);
          return this.pagination;
        })
      );
  }

  getBooking(id: string) {
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

  getUsers(){
    return this.http.get<IUser[]>(this.baseUrl + 'account/all').pipe(
      map(response => {
        this.users = response;
        return response;
      })
    );
  }

}
