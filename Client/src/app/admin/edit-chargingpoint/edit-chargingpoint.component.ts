import { Component, OnInit, Input, Inject, ElementRef, ViewChild } from '@angular/core';
import { IChargingPoint, ProductFormValues, IChargingPointToCreate } from '../../shared/models/chargingPoint';
import { AdminService } from '../admin.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreParams } from '../../shared/models/storeParams';
import { StoreService } from '../../store/store.service';
import { IChargingPointLocation } from '../../shared/models/chargingPointLocation';
import { IChargingPointType } from '../../shared/models/chargingPointType';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-chargingpoint',
  templateUrl: './edit-chargingpoint.component.html',
  styleUrls: ['./edit-chargingpoint.component.css']
})
export class EditChargingpointComponent implements OnInit {

  @ViewChild('search', { static: false }) search: ElementRef;
  @Input() chargingPoint: IChargingPoint;
  @Input() product: ProductFormValues;
  chargingPoints: IChargingPoint[];
  chargingPointLocations: IChargingPointLocation[];
  chargingPointTypes: IChargingPointType[];
  storeParams: StoreParams;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
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
    const chargingPointLocations = this.getChargingPointLocations();
    const chargingPointTypes = this.getChargingPointTypes();
  }

  getChargingPoints(useCache = false) {
    let params = this.storeService.getStoreParams();
    params.pageSize = 9999999;
    this.storeService.setStoreParams(params);
    this.storeService.getChargingPoints(useCache).subscribe(response => {
      this.chargingPoints = response.data;
    }, error => {
        console.log(error);
        this._alertify.error(error);       
    });
  }

  removeChargingPoint(chargingPointId: number) {
    if (this.adminService.removeChargingPoint(chargingPointId))
      this._alertify.error('Charging point removed!');
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpoint']));
  }

  updateChargingPoint(chargingPointId: number): void {

    var temp1 = this.chargingPoints.filter(obj => obj.id == chargingPointId)[0];
    var temp2: IChargingPointToCreate = {
      id: temp1.id,
      description: temp1.description,
      name: temp1.name,
      price: temp1.price,
      qtyAvailable: temp1.qtyAvailable,
      qtyTotal: temp1.qtyTotal,
      chargingPointLocationId: this.chargingPointLocations.find(x => x.name === temp1.chargingPointLocation).id,
      chargingPointTypeId: this.chargingPointTypes.find(x => x.name === temp1.chargingPointType).id
    }

    if (this.adminService.updateChargingPoint(temp2)
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

  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path != 'create') {
      var updatedChargingPoint = { ...this.product, ...product, price: +product.price };
      this.adminService.updateChargingPoint(updatedChargingPoint).subscribe((response: any) => {
        this.router.navigate(['/admin/chargingpoint']);
      });
    } else {
      const newProduct = { ...product, price: +product.price };
      this.adminService.createChargingPoint(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin/chargingpoint']);
      });
    }
  }

  getChargingPointLocations() {
    this.storeService.getChargingPointLocations().subscribe(x => this.chargingPointLocations = x);
  }

  getChargingPointTypes() {
    this.storeService.getChargingPointTypes().subscribe(x => this.chargingPointTypes = x);
  }

}
