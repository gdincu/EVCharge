import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ChargingPointItemComponent } from './charging-point-item/charging-point-item.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: ':id', component: ChargingPointItemComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
