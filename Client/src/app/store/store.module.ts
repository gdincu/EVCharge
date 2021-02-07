import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { ChargingPointItemComponent } from './chargingPoint-item/chargingPoint-item.component';
import { ChargingPointDetailsComponent } from './chargingPoint-details/chargingPoint-details.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [
    StoreComponent,
    ChargingPointItemComponent,
    ChargingPointDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
