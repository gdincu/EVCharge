import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';



@NgModule({
  declarations: [NavBarComponent, NotFoundComponent, ServerErrorComponent, TestErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }