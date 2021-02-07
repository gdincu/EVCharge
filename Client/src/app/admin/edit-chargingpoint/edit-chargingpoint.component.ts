import { Component, OnInit } from '@angular/core';
import { IChargingPoint } from '../../shared/models/chargingPoint';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-chargingpoint',
  templateUrl: './edit-chargingpoint.component.html',
  styleUrls: ['./edit-chargingpoint.component.css']
})
export class EditChargingpointComponent implements OnInit {

  chargingPoints: IChargingPoint[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getChargingPoints();
  }

  getChargingPoints() {
    this.adminService.getAllChargingPoints().subscribe(response => {
      this.chargingPoints = response;
    }, error => {
      console.log(error);
    });
  }

  removeChargingPoint(chargingPointId: number) {
    this.adminService.removeChargingPoint(chargingPointId);
    this.getChargingPoints();
  }

}
