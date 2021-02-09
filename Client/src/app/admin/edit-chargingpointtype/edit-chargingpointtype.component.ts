import { Component, OnInit } from '@angular/core';
import { IChargingPointType } from '../../shared/models/chargingPointType';
import { AdminService } from '../admin.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-chargingpointtype',
  templateUrl: './edit-chargingpointtype.component.html',
  styleUrls: ['./edit-chargingpointtype.component.css']
})
export class EditChargingpointtypeComponent implements OnInit {

  chargingPointTypes: IChargingPointType[];

  constructor(
    private adminService: AdminService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getChargingPointTypes();
  }

  getChargingPointTypes() {
    this.adminService.getChargingPointTypes().subscribe(response => {
      this.chargingPointTypes = response;
    }, error => {
      console.log(error);
    });
  }

  removeChargingPointType(id: number) {
    if (this.adminService.removeChargingPointType(id))
      this._alertify.error('ChargingPointType removed!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointtype']));
  }

  updateChargingPointType(id: number) {
    if (this.adminService.updateChargingPointType(this.chargingPointTypes.filter(obj => obj.id == id)[0])
      .subscribe())
      this._alertify.success('ChargingPointType updated!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointtype']));
  }

  createChargingPointType(name: string, powerrating: number) {
    var arr = this.chargingPointTypes;
    var temp2: IChargingPointType = {
      id: arr.reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0),
      name: name,
      powerRatingKW: +powerrating
    }

    if (this.adminService.createChargingPointType(temp2).subscribe())
      this._alertify.success('ChargingPointType created!');

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointtype']));
  }

}
