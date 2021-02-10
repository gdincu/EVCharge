import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
