import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  datos: any = [];
  
  filtro = '';
  
constructor(private authService:ApiService) { }


  ngOnInit(): void {
    // METODO BUSCAR LIBRO
    this.authService.getBooks().subscribe((data) => {
      this.datos = data;
    })
  }

  handleSearch(value: string) {
    this.filtro = value;
  }
}
