import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ChargingPointItemComponent } from './store/charging-point-item/charging-point-item.component';


const routes: Routes = [
  { path: '', component: AboutComponent },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'store/:id',
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
    canActivate: [AuthGuard, AdminGuard],
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
