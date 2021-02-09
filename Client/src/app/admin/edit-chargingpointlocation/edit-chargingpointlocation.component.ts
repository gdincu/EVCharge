import { Component, OnInit } from '@angular/core';
import { IChargingPointLocation } from '../../shared/models/chargingPointLocation';
import { AdminService } from '../admin.service';
import { AlertifyService } from '../../shared/services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-chargingpointlocation',
  templateUrl: './edit-chargingpointlocation.component.html',
  styleUrls: ['./edit-chargingpointlocation.component.css']
})
export class EditChargingpointlocationComponent implements OnInit {

  chargingPointLocations: IChargingPointLocation[];

  constructor(
    private adminService: AdminService,
    private _alertify: AlertifyService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getChargingPointLocations();
  }

  getChargingPointLocations() {
    this.adminService.getChargingPointLocations().subscribe(response => {
      this.chargingPointLocations = response;
    }, error => {
      console.log(error);
    });
  }

  removeChargingPointLocation(id: number) {
    if (this.adminService.removeChargingPointLocation(id))
      this._alertify.error('ChargingPointLocation removed!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointlocation']));
  }

  updateChargingPointLocation(id: number) {
    if (this.adminService.updateChargingPointLocation(this.chargingPointLocations.filter(obj => obj.id == id)[0])
      .subscribe())
      this._alertify.success('ChargingPointLocation updated!');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointlocation']));
  }

  createChargingPointLocation(name: string, city: string, street: string, housenumber: string, postcode: string) {
    var arr = this.chargingPointLocations;
    var temp2: IChargingPointLocation = {
      name: name,
      city: city,
      street: street,
      houseNumber: housenumber,
      postcode: postcode
    }

    if (this.adminService.createChargingPointLocation(temp2).subscribe())
      this._alertify.success('ChargingPointLocation created!');

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['admin/chargingpointlocation']));
  }

}
