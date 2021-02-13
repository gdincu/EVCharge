import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ChargingPointItemComponent } from './charging-point-item/charging-point-item.component';

@NgModule({
  declarations: [
    StoreComponent,
    ChargingPointItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
