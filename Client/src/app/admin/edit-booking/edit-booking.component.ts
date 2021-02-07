import { Component, OnInit } from '@angular/core';
import { IBooking } from '../../shared/models/booking';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  bookings: IBooking[];

  constructor(private adminService: AdminService) { }

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

}
