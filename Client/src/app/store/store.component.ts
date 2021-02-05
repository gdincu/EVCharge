import { Component, OnInit } from '@angular/core';
import { IBooking } from '../shared/models/booking';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  bookings: IBooking[];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.storeService.getBookings().subscribe(response => {
      this.bookings = response.data;
    }, error => {
      console.log(error);
    });
  }

}
