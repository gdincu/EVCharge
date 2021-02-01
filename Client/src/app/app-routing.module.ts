import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'store', loadChildren: () => import('./store/store.module').then(mod => mod.StoreModule), data: { breadcrumb: 'Store' } },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
