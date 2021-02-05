import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingItemComponent } from './booking-item/booking-item.component';

@NgModule({
  declarations: [StoreComponent, BookingDetailsComponent, BookingItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
