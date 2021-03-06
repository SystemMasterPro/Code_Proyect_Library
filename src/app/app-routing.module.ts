import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChackLoginGuard, ChackLogoutGuard } from './shared/guards/chack-login.guard';
import { FormOrderComponent } from './pages/books/form-order/form-order.component';
import { ExitFormGuard } from './shared/guards/exit-form.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [ChackLoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [ChackLoginGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [ChackLogoutGuard],
  },
  {
    path: 'book', loadChildren: () =>
      import('./pages/books/books.module').then(m => m.BooksModule),
    canActivate: [ChackLoginGuard],  },
  {
    path: 'order', loadChildren: () =>
      import('./pages/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [ChackLoginGuard],
  },
  {
    path: 'new-order/:id',
    canDeactivate:[ExitFormGuard],
    component: FormOrderComponent,
    canActivate: [ChackLoginGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    canActivate: [ChackLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
