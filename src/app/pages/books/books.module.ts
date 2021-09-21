import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { BooksRoutingModule } from './books-routing.module';
import { SearchFilterPipe } from '../../Pipes/search-filter.pipe';
import { BooksComponent } from './books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormOrderComponent } from './form-order/form-order.component';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import {
    MatDatepickerModule
}
from '@angular/material/datepicker';
import {
    MatNativeDateModule
}
from '@angular/material/core';

import {
    MatFormFieldModule
}
  from '@angular/material/form-field';
import {
    MatInputModule
}
from '@angular/material/input';

import {
    MatButtonModule
}
from '@angular/material/button';



@NgModule({
  declarations: [
    BooksComponent,
    SearchComponent,
    SearchFilterPipe,
    FormOrderComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class BooksModule { }
