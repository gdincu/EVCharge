import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { IChargingPoint } from '../../shared/models/chargingPoint';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../booking/booking.service';
import { DOCUMENT } from '@angular/common';
import { AlertifyService } from '../../shared/services/alertify.service';
import { IChargingPointLocation } from '../../shared/models/chargingPointLocation';
import { IChargingPointType } from '../../shared/models/chargingPointType';

@Component({
  selector: 'app-charging-point-item',
  templateUrl: './charging-point-item.component.html',
  styleUrls: ['./charging-point-item.component.css']
})
export class ChargingPointItemComponent implements OnInit {
  item: IChargingPoint;
  location: string;
  type: string;
  @ViewChild('start', { static: false }) start: ElementRef;
  @ViewChild('end', { static: false }) end: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storeService: StoreService,
    private bookingService: BookingService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadItem();
  }

  book() {
    //Reads start and end values from the form input fields
    let start = this.start.nativeElement.value;
    let end = this.end.nativeElement.value;

    //Checks the availability of a specific chargingpoint based on start and end dates
    if (this.checkAvailability(this.item.id,start,end))
      if (this.bookingService.createBooking(this.item.id, start, end))
        this._alertify.success('Booking completed!');
      else
        this._alertify.error('Booking could not be completed! Please try again and if the error persists contact our support service!');
    //Navigating back to the store component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/bookings']));
  }

  loadItem() {
    this.storeService.getChargingPoint(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
      //this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });

    ////////////////////GET LOCATION NAME
    this.location = 'LOCATION1';
    ////////////////////GET TYPE NAME
    this.type = 'TYPE1';
  }

  checkAvailability(chargingPointId: number, start: Date, end: Date) {
    ////////////////////this.storeService.getChargingPoints(false).subscribe(x => {
    ////////////////////if (x.data.find(y => y.id == chargingPointId).qtyAvailable == 0)
    return true;
  }

}
