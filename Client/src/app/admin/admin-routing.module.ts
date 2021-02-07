import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { EditChargingpointComponent } from './edit-chargingpoint/edit-chargingpoint.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'chargingpoint', component: EditChargingpointComponent },
  { path: 'booking', component: EditBookingComponent },
  { path: 'user', component: EditUserComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
