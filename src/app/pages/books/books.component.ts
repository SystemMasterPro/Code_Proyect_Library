import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2'

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
      console.log(data);
    })
  }

  isOrder() {
    Swal.fire({
      title: 'Atencion!',
      text: "Antes de solicitarlo debe de tener en cuenta que tiene como maximo 2 solicitudes, no puede tener mas!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Entiendo',
      focusConfirm: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Solicitud enviada con exito!',
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
    
  }

  handleSearch(value: string) {
    this.filtro = value;
  }
}
