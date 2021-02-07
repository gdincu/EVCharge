import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [PagerComponent, PagingHeaderComponent, TextInputComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BsDropdownModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ReactiveFormsModule,
    FormsModule,
    TextInputComponent
  ],
  providers: [
    PaginationConfig,
    BsDropdownConfig
  ]
})
export class SharedModule { }
