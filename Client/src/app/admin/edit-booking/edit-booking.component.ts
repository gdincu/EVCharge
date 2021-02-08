import { Component, OnInit, Input, Inject } from '@angular/core';
import { IBooking } from '../../shared/models/booking';
import { AdminService } from '../admin.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
    this.adminService.removeBooking(bookingId);
    this.getBookings();
  }

  updateBooking(bookingId: number): void {
    this.adminService.updateBooking(this.bookings.filter(obj => obj.id == bookingId)[0])
      .subscribe();
  }
}
