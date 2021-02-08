import { Component, OnInit, Input, Inject, ElementRef, ViewChild } from '@angular/core';
import { IBooking } from '../../shared/models/booking';
import { AdminService } from '../admin.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../shared/services/alertify.service';
import { Router } from '@angular/router';
import { BookingParams } from '../../shared/models/bookingParams';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  @ViewChild('start', { static: false }) start: ElementRef;
  @ViewChild('end', { static: false }) end: ElementRef;
  bookings: IBooking[];
  @Input() booking: IBooking;
  bookingParams: BookingParams;
  sortOptions = [
    { name: 'End Date Asc', value: 'enddateasc' },
    { name: 'End Date Asc', value: 'enddatedesc' },
    { name: 'Start Date Desc', value: 'startdateasc' },
    { name: 'Start Date Asc', value: 'startdatedesc' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private adminService: AdminService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) {
    this.bookingParams = this.adminService.getBookingParams();
  }

  ngOnInit() {
    this.getBookings(true);
  }

  getBookings(useCache = false) {
    this.adminService.getBookings(useCache).subscribe(response => {
      this.bookings = response.data;
    }, error => {
      console.log(error);
    });
  }

  removeBooking(bookingId: number) {
    if (this.adminService.removeBooking(bookingId))
      this._alertify.error('Booking removed!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/booking']));
  }

  updateBooking(bookingId: number): void {
    if(this.adminService.updateBooking(this.bookings.filter(obj => obj.id == bookingId)[0])
      .subscribe())
      this._alertify.success('Booking details updated!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/booking']));
  }

  onSearch() {
    const params = this.adminService.getBookingParams();
    params.start = this.start.nativeElement.value;
    params.end = this.end.nativeElement.value;
    params.pageNumber = 1;
    this.adminService.setBookingParams(params);
    this.getBookings();
  }

  onReset() {
    this.start.nativeElement.value = '';
    this.end.nativeElement.value = '';
    this.bookingParams = new BookingParams();
    this.adminService.setBookingParams(this.bookingParams);
    this.getBookings();
  }
}
