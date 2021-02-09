import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditChargingpointComponent } from './edit-chargingpoint/edit-chargingpoint.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { EditChargingpointlocationComponent } from './edit-chargingpointlocation/edit-chargingpointlocation.component';
import { EditChargingpointtypeComponent } from './edit-chargingpointtype/edit-chargingpointtype.component';

@NgModule({
  declarations: [
    AdminComponent,
    EditChargingpointComponent,
    EditUserComponent,
    EditBookingComponent,
    EditChargingpointlocationComponent,
    EditChargingpointtypeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
    ],
  exports: [
    EditChargingpointComponent,
    EditUserComponent,
    EditBookingComponent
  ]
})
export class AdminModule { }
