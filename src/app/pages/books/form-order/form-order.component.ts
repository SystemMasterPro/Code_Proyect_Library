import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/shared/models/order';
import { OnExit } from 'src/app/shared/guards/exit-form.guard';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {

  order: Book;
  user: any
  deliver_date:string=''

  constructor(private service: ApiService, private activeRouter: ActivatedRoute, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('user') + '');
    this.order = new Book();
    this.service.updateToken();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(b => {
      if (b['id']) {
        this.service.findById(b['id']).subscribe(book => {
          this.order = book;
        })
      }
    });
  }

  saveOrder() {
    const orderNew = {
      user: this.user.id,
      book: this.order.id,
      deliver_date: this.deliver_date
    }
    
    const idBook = this.order.id

    const bookOrder = {
      title: this.order.title,
      author: this.order.author,
      state: false,
      category: this.order.category
    }
    if (orderNew.deliver_date != '') {
      this.service.postOrderUser(orderNew).subscribe((data) => {
        this.service.putBook(idBook, bookOrder).subscribe(res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Solicitud enviada con exito!',
            showConfirmButton: false,
            timer: 1000
          });
          this.route.navigate(['/book']);
        })
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debe colocar la fecha que estima sea necesaria para la devolucion del libro',
        showConfirmButton: true,
        confirmButtonColor : '#d33'
      });
    }
  }

  cancelOrder() {
    this.route.navigate(['/book'])
  }

  onExit() {
    if (this.deliver_date === '') {
      const rta = confirm('Esta seguro de salir, el formulario no se ha enviado');
      return rta;
    }
    return true;
  }

}
