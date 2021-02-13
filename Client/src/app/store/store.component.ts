import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StoreService } from './store.service';
import { IChargingPoint } from '../shared/models/chargingPoint';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { StoreParams } from '../shared/models/storeParams';
import { AlertifyService } from '../shared/services/alertify.service';
import { Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  chargingPoints: IChargingPoint[] = [];
  chargingPointLocations: IChargingPointLocation[] = [];
  chargingPointTypes: IChargingPointType[] = [];
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Asc', value: 'priceAsc' },
    { name: 'Price: Desc', value: 'priceDesc' },
    { name: 'Type: Asc', value: 'typeAsc' },
    { name: 'Type: Desc', value: 'typeDesc' },
    { name: 'Location: Asc', value: 'locationAsc' },
    { name: 'Location: Desc', value: 'locationDesc' }
  ];
  storeParams: StoreParams;

  constructor(
    private storeService: StoreService,
    private bookingService: BookingService,
    private _alertify: AlertifyService,
    private router: Router
  ) {
    this.storeParams = this.storeService.getStoreParams();
  }

  ngOnInit() {
    this.getChargingPoints(true);
    this.getChargingPointLocations();
    this.getChargingPointTypes();
  }

  getChargingPoints(useCache = false) {
    this.storeService.getChargingPoints(useCache).subscribe(response => {
      this.chargingPoints = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getChargingPointLocations() {
    this.storeService.getChargingPointLocations().subscribe(response => {
      this.chargingPointLocations = [{ id: 0, name: 'All', city: 'All', street: 'All', houseNumber: 'All', postcode: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }

  getChargingPointTypes() {
    this.storeService.getChargingPointTypes().subscribe(response => {
      this.chargingPointTypes = [{ id: 0, name: 'All', powerRatingKW: 0 }, ...response];
    }, error => {
      console.log(error);
    });
  }

  onLocationSelected(locationId: number) {
    const params = this.storeService.getStoreParams();
    params.ChargingPointLocationId = locationId;
    params.pageNumber = 1;
    this.storeService.setStoreParams(params);
    this.getChargingPoints();
  }

  onTypeSelected(typeId: number) {
    const params = this.storeService.getStoreParams();
    params.ChargingPointTypeId = typeId;
    params.pageNumber = 1;
    this.storeService.setStoreParams(params);
    this.getChargingPoints();
  }

  onSortSelected(sort: string) {
    const params = this.storeService.getStoreParams();
    params.sort = sort;
    this.storeService.setStoreParams(params);
    this.getChargingPoints();
  }

  onPageChanged(event: any) {
    const params = this.storeService.getStoreParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.storeService.setStoreParams(params);
      this.getChargingPoints();
    }
  }

  onSearch() {
    const params = this.storeService.getStoreParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.storeService.setStoreParams(params);
    this.getChargingPoints();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.storeParams = new StoreParams();
    this.storeService.setStoreParams(this.storeParams);
    this.getChargingPoints();
  }

  book(chargingPointId: number) {
    this.storeService.getChargingPoints(false).subscribe(x => {
      if (x.data.find(y => y.id == chargingPointId).qtyAvailable == 0)
        this._alertify.error('Insufficient quantity available!');
      else if (this.bookingService.createBooking(chargingPointId))
        this._alertify.success('Booking completed!');
      else
        this._alertify.error('Booking could not be completed! Please try again and if the error persists contact our support service!');
    });
    //Navigating back to the store component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/store']));
  }

}
