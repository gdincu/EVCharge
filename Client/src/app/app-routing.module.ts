import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ChargingPointDetailsComponent } from './store/chargingPoint-details/chargingPoint-details.component';
import { ChargingPointItemComponent } from './store/chargingPoint-item/chargingPoint-item.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'store', component: StoreComponent },
  {
    path: 'store/:id',
    canActivate: [AuthGuard],
    component: ChargingPointDetailsComponent
  },
  {
    path: 'chargingpointitem',
    canActivate: [AuthGuard],
    component: ChargingPointItemComponent
  },
  {
    path: 'bookings',
    canActivate: [AuthGuard],
    component: BookingComponent
  },
  {
    path: 'admin',
    //canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  { path: 'contact', component: ContactComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
