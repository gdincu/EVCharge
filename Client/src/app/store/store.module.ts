import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
