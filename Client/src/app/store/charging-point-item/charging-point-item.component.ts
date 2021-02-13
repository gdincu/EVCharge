import { Component, OnInit } from '@angular/core';
import { IChargingPoint } from '../../shared/models/chargingPoint';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../booking/booking.service';

@Component({
  selector: 'app-charging-point-item',
  templateUrl: './charging-point-item.component.html',
  styleUrls: ['./charging-point-item.component.css']
})
export class ChargingPointItemComponent implements OnInit {
  item: IChargingPoint;

  constructor(
    private storeService: StoreService,
    private bookingService: BookingService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadItem();
  }

  addItemToBasket() {
    this.bookingService.createBooking(this.item.id);
  }

  loadItem() {
    this.storeService.getChargingPoint(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
      //this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

}
