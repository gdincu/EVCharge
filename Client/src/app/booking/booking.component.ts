import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser, IUserToReturn } from '../shared/models/user';
import { IBooking } from '../shared/models/booking';
import { BookingParams } from '../shared/models/bookingParams';
import { BookingService } from './booking.service';
import { AccountService } from '../account/account.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('start', { static: false }) start: ElementRef;
  @ViewChild('end', { static: false }) end: ElementRef;
  bookings: IBooking[] = [];
  users: IUser[] = [];
  totalCount: number;
  
  sortOptions = [
    { name: 'Start Date Asc', value: 'startdateasc' },
    { name: 'Start Date Desc', value: 'startdatedesc' },
    { name: 'End Date Asc', value: 'enddateasc' },
    { name: 'End Date Desc', value: 'enddatedesc' }
  ];
  bookingParams: BookingParams;

  constructor(
    private bookingService: BookingService,
    private accountService: AccountService
  ) {
    this.bookingParams = this.bookingService.getBookingParams();
  }

  ngOnInit() {   
    this.getBookings(false);
  }

  getBookings(useCache = false) {
    this.bookingService.getBookings(useCache).subscribe(response => {
      this.bookings = response.data;
      this.totalCount = this.bookings.length;
    }, error => {
      console.log(error);
    });
  }

  onSortSelected(sort: string) {
    const params = this.bookingService.getBookingParams();
    params.sort = sort;
    this.bookingService.setBookingParams(params);
    this.getBookings(false);
  }

  onPageChanged(event: any) {
    const params = this.bookingService.getBookingParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.bookingService.setBookingParams(params);
      this.getBookings(false);
    }
  }

  onSearch() {
    const params = this.bookingService.getBookingParams();
    params.start = this.start.nativeElement.value;
    params.end = this.end.nativeElement.value;
    params.pageNumber = 1;
    this.bookingService.setBookingParams(params);
    this.getBookings(false);
  }

  onReset() {
    this.start.nativeElement.value = '';
    this.end.nativeElement.value = '';
    this.bookingParams = new BookingParams();
    this.bookingService.setBookingParams(this.bookingParams);
    this.getBookings(false);
  }
  
  }
