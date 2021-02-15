import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { IChargingPoint, IChargingPointToCreate } from '../../shared/models/chargingPoint';
import { IChargingPointLocation } from '../../shared/models/chargingPointLocation';
import { IChargingPointType } from '../../shared/models/chargingPointType';
import { DOCUMENT } from '@angular/common';
import { AdminService } from '../admin.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-chargingpoint',
  templateUrl: './add-chargingpoint.component.html',
  styleUrls: ['./add-chargingpoint.component.css']
})
export class AddChargingpointComponent implements OnInit {
  chargingPoints: IChargingPoint[];
  chargingPointLocations: IChargingPointLocation[];
  chargingPointTypes: IChargingPointType[];
  exampleType;
  exampleLocation;
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('price', { static: false }) price: ElementRef;

  constructor(
    private storeService: StoreService,
    private adminService: AdminService,
    @Inject(DOCUMENT) private document: Document,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getChargingPoints(true);
    this.getChargingPointLocations();
    this.getChargingPointTypes();
  }

  getChargingPoints(useCache = false) {
    this.storeService.getChargingPoints(useCache).subscribe(response => {
      this.chargingPoints = response.data;
    }, error => {
      console.log(error);
    });
  }

  getChargingPointLocations() {
    this.storeService.getChargingPointLocations().subscribe(response => {
      this.chargingPointLocations = response;
    }, error => {
      console.log(error);
    });
  }

  getChargingPointTypes() {
    this.storeService.getChargingPointTypes().subscribe(response => {
      this.chargingPointTypes = response;
    }, error => {
      console.log(error);
    });
  }

  onClick() {
    var arr = this.chargingPoints;
    var temp: IChargingPointToCreate = {
      id: 0,
      name: this.name.nativeElement.value,
      description: this.description.nativeElement.value,
      price: +this.price.nativeElement.value,
      chargingPointTypeId: +this.exampleType.id,
      chargingPointLocationId: +this.exampleLocation.id
    }

    console.log(temp);

    if (this.adminService.createChargingPoint(temp).subscribe()) {
      this._alertify.success('ChargingPoint created!');
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(() =>
        this.router.navigate(['admin/chargingpoint']));
    } else
    {
      this._alertify.error('ChargingPoint not created! Please review form data!');
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(() =>
        this.router.navigate(['admin/chargingpoint/add']));
    }
  }

}
