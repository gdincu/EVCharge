import { Component, OnInit, Input, Inject, ElementRef, ViewChild } from '@angular/core';
import { IChargingPoint } from '../../shared/models/chargingPoint';
import { AdminService } from '../admin.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StoreParams } from '../../shared/models/storeParams';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-edit-chargingpoint',
  templateUrl: './edit-chargingpoint.component.html',
  styleUrls: ['./edit-chargingpoint.component.css']
})
export class EditChargingpointComponent implements OnInit {

  @ViewChild('search', { static: false }) search: ElementRef;
  chargingPoints: IChargingPoint[];
  @Input() chargingPoint: IChargingPoint;
  storeParams: StoreParams;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private adminService: AdminService,
    private storeService: StoreService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) {
    this.storeParams = this.storeService.getStoreParams();
  }

  ngOnInit() {
    this.getChargingPoints(true);
  }

  getChargingPoints(useCache = false) {
    this.storeService.getChargingPoints(useCache).subscribe(response => {
      this.chargingPoints = response.data;
    }, error => {
        console.log(error);
        this._alertify.error(error);       
    });
  }

  removeChargingPoint(chargingPointId: number) {
    if (this.adminService.removeChargingPoint(chargingPointId))
      this._alertify.success('Charging point removed!');       
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpoint']));
  }

  updateChargingPoint(chargingPointId: number): void {
    if (this.adminService.updateChargingPoint(this.chargingPoints.filter(obj => obj.id == chargingPointId)[0])
      .subscribe())
      this._alertify.success('Charging point details updated!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpoint']));
  }

  onSearch() {
    const params = this.storeService.getStoreParams();
    params.search = this.search.nativeElement.value;
    params.pageNumber = 1;
    this.storeService.setStoreParams(params);
    this.getChargingPoints();
  }

  onReset() {
    this.search.nativeElement.value = '';
    this.storeParams = new StoreParams();
    this.storeService.setStoreParams(this.storeParams);
    this.getChargingPoints();
  }

}
