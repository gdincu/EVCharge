import { Component, OnInit, Input, Inject } from '@angular/core';
import { IBooking } from '../../shared/models/booking';
import { AdminService } from '../admin.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../shared/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  bookings: IBooking[];
  @Input() booking: IBooking;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private adminService: AdminService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.adminService.getBookings().subscribe(response => {
      this.bookings = response;
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
}
