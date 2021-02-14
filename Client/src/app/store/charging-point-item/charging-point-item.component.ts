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
  startDate: Date;
  endDate: Date;

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

  loadItem() {
    this.storeService.getChargingPoint(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
      this.location = this.item.chargingPointLocation;
      this.type = this.item.chargingPointType;
    }, error => {
      console.log(error);
    });
    
  }

  book() {
    //Reads start and end values from the form input fields
    this.startDate = this.start.nativeElement.value;
    this.endDate = this.end.nativeElement.value;

    if (!this.startDate || !this.endDate) {
      this._alertify.error('Both start and end dates need to be filled in!');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>  
        this.router.navigate(['/store/' + this.item.id]));
      return;
    }

    if (this.startDate > this.endDate) {
      this._alertify.error('End date cannot be before start date! Try again!');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/store/' + this.item.id]));
      return;
    }

    //Checks the availability of a specific chargingpoint based on start and end dates
    console.log('availableFlag: ' + this.storeService.checkAvailability(this.item.id, this.startDate, this.endDate));
    
    //TBC
     if (!this.storeService.availableFlag) {
      this._alertify.error('Booking could not be completed due to insufficient qty on the selected dates! Please try again using different start & end dates!');
      //Navigating back to the store component
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/store/' + this.item.id]));
      return;
    }

    //OK
    if (this.storeService.createBooking(this.item.id, this.startDate, this.endDate).subscribe()) {
      this._alertify.success('Booking completed!');
      //Navigating back to the store component
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/store']));
    }
    else {
      this._alertify.error('Booking could not be completed! Please try again and if the error persists contact our support service!');
      //Navigating back to the store component
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/store/' + this.item.id]));
    }

  }

}
