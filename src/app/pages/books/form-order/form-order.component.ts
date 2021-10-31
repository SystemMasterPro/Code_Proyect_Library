import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {Book} from 'src/app/shared/models/order';
import Swal from 'sweetalert2';

@Component({selector: 'app-form-order', templateUrl: './form-order.component.html', styleUrls: ['./form-order.component.css']})
export class FormOrderComponent implements OnInit {
    calendar = new Date()
    minDate = new Date(this.calendar.getFullYear(), this.calendar.getMonth(), this.calendar.getDate());
    maxDate = new Date(this.calendar.getFullYear(), (this.calendar.getMonth() + 1), this.calendar.getDate());
    order : Book;
    evualation = true;
    user : any;
    deliver_date : string = '';
    prestados : any;
    stock : any;
    constructor(private service : ApiService, private activeRouter : ActivatedRoute, private route : Router) {
        this.user = JSON.parse(localStorage.getItem('user') + '');
        this.order = new Book();
    }

    ngOnInit(): void {
        this.activeRouter.params.subscribe((b) => {
            if (b['id']) {
                this.service.findById(b['id']).subscribe((book) => {
                    this.order = book;
                    this.prestados = this.order.borrowed;
                    this.stock = this.order.stock;
                });
            }
        });
    }

    saveOrder() {
        
        
        const orderNew = {
            user: this.user.id,
            book: this.order.id,
            deliver_date: this.deliver_date
        };

        const idBook = this.order.id;

        if (this.evualation) {
            this.stock = this.stock - 1;
        }

        if (this.stock === 0) {
            const bookOrder = {
                title: this.order.title,
                author: this.order.author,
                state: false,
                stock: this.stock,
                borrowed: this.prestados + 1,
                category: this.order.category
            };
            if (orderNew.deliver_date != '') {
                this.evualation = false;
                this.service.postOrderUser(orderNew).subscribe((data) => {
                    this.service.putBook(idBook, bookOrder).subscribe((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Solicitud enviada con exito!',
                            text:'Recibira un correo de confirmacion por parte de la institucion donde se le brindara todos los detalles de entrega y devolucion, un placer servirle',
                            showConfirmButton: true,
                        });
                        this.evualation = true;
                        this.route.navigate(['/book']);
                    });
                });

            } else {
                this.evualation = false
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Por Favor, Debe colocar la fecha que estima sea necesaria para la devolucion del libro',
                    showConfirmButton: true,
                    confirmButtonColor: '#d33'
                });
            }
        } else {
            const bookOrder = {
                title: this.order.title,
                author: this.order.author,
                state: true,
                stock: this.stock,
                borrowed: this.prestados + 1,
                category: this.order.category
            };
            if (orderNew.deliver_date != '') {
                this.evualation = false
                this.service.postOrderUser(orderNew).subscribe((data) => {
                    this.service.putBook(idBook, bookOrder).subscribe((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Solicitud enviada con exito!',
                            text : 'Recibira un correo de confirmacion por parte de la institucion donde se le brindara los detalles todos los detalles de entrega y devolucion, un placer servirle',
                            showConfirmButton: true,
                        });
                        this.evualation = true
                        this.route.navigate(['/book']);
                    });
                });
            } else {
                this.evualation = false
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Por favor, Debe colocar la fecha que estima sea necesaria para la devolucion del libro',
                    showConfirmButton: true,
                    confirmButtonColor: '#d33'
                });
            }
        }
    }

    cancelOrder() {
        this.route.navigate(['/book']);
    }

    onExit() {
        if (this.deliver_date === '') {
            const rta = confirm('Esta seguro de salir, el formulario no se ha enviado');
            return rta;
        }
        return true;
    }
}
