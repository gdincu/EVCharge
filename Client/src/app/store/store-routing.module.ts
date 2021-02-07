import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ChargingPointDetailsComponent } from './chargingPoint-details/chargingPoint-details.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: ':id', component: ChargingPointDetailsComponent, data: { breadcrumb: { alias: 'chargingPointDetails' } } },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
