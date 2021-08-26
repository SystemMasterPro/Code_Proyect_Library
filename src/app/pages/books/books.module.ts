import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { BooksRoutingModule } from './books-routing.module';
import { SearchFilterPipe } from '../../Pipes/search-filter.pipe';
import { BooksComponent } from './books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormOrderComponent } from './form-order/form-order.component';



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
    ReactiveFormsModule
  ]
})
export class BooksModule { }
