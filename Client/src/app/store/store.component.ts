import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { IChargingPoint } from '../shared/models/chargingPoint';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { StoreParams } from '../shared/models/storeParams';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  chargingPoints: IChargingPoint[];
  chargingPointLocations: IChargingPointLocation[];
  chargingPointTypes: IChargingPointType[];
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  storeParams: StoreParams;

  constructor(private storeService: StoreService) {
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

  //onSearch() {
  //  const params = this.storeService.getStoreParams();
  //  params.search = this.searchTerm.nativeElement.value;
  //  params.pageNumber = 1;
  //  this.shopService.setShopParams(params);
  //  this.getProducts();
  //}

  //onReset() {
  //  this.searchTerm.nativeElement.value = '';
  //  this.shopParams = new ShopParams();
  //  this.shopService.setShopParams(this.shopParams);
  //  this.getProducts();
  //}

}
