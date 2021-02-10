import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from '../shared/models/user';
import { IChargingPoint, IChargingPointToCreate } from '../shared/models/chargingPoint';
import { IBooking } from '../shared/models/booking';
import { BookingParams } from '../shared/models/bookingParams';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('start', { static: false }) start: ElementRef;
  @ViewChild('end', { static: false }) end: ElementRef;
  bookings: IBooking[] = [];
  chargingPoints: IChargingPointToCreate[] = [];
  users: IUser[] = [];
  currentUser: string;
  totalCount: number;
  sortOptions = [
    { name: 'End Date Asc', value: 'enddateasc' },
    { name: 'End Date Asc', value: 'enddatedesc' },
    { name: 'Start Date Desc', value: 'startdateasc' },
    { name: 'Start Date Asc', value: 'startdatedesc' }
  ];
  bookingParams: BookingParams;

  constructor(
    private bookingService: BookingService
  ) {
    this.bookingParams = this.bookingService.getBookingParams();
  }

  ngOnInit() {
    this.getUsers();
    this.currentUser = localStorage.getItem('email');
    this.getBookings(true, this.currentUser);
  }
    getUsers() {
      this.bookingService.getUsers().subscribe(response => {
          this.users = response;
        }, error => {
          console.log(error);
        });
    }


  getBookings(useCache = false, email: string) {
    this.bookingService.getBookings(useCache).subscribe(response => {
      var tempUserId = this.users.find(x => x.email == email).id;
      var temp = response.data.filter(x => x.userId == tempUserId);
      this.bookings = temp;
      this.totalCount = temp.length;
    }, error => {
      console.log(error);
    });
    }

  onSortSelected(sort: string) {
    const params = this.bookingService.getBookingParams();
    params.sort = sort;
    this.bookingService.setBookingParams(params);
    this.getBookings(true, this.currentUser);
  }

  onPageChanged(event: any) {
    const params = this.bookingService.getBookingParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.bookingService.setBookingParams(params);
      this.getBookings(true, this.currentUser);
    }
  }

  onSearch() {
    const params = this.bookingService.getBookingParams();
    params.start = this.start.nativeElement.value;
    params.end = this.end.nativeElement.value;
    params.pageNumber = 1;
    this.bookingService.setBookingParams(params);
    this.getBookings(true, this.currentUser);
  }

  onReset() {
    this.start.nativeElement.value = '';
    this.end.nativeElement.value = '';
    this.bookingParams = new BookingParams();
    this.bookingService.setBookingParams(this.bookingParams);
    this.getBookings(true, this.currentUser);
  }

  onUserSelected(username: string) {
    const params = this.bookingService.getBookingParams();
    params.username = username;
    params.pageNumber = 1;
    this.bookingService.setBookingParams(params);
    this.getBookings(true, this.currentUser);
  }

  onChargingPointSelected(id: number) {
    const params = this.bookingService.getBookingParams();
    params.chargingPointId = id;
    params.pageNumber = 1;
    this.bookingService.setBookingParams(params);
    this.getBookings(true, this.currentUser);
  }

}
