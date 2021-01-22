import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingItemComponent } from './booking-item/booking-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyFieldStepper } from './stepper.type';

@NgModule({
  declarations: [StoreComponent, BookingDetailsComponent, BookingItemComponent, FormlyFieldStepper],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
      ],
    }),
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
