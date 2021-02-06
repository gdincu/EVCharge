import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PagerComponent, PagingHeaderComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  exports: [
    CommonModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent
  ],
  providers: [
    PaginationConfig
  ]
})
export class SharedModule { }
