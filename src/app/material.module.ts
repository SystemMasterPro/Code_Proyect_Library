import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const myModules = [MatToolbarModule,MatSidenavModule,MatButtonModule,MatMenuModule,MatListModule,MatIconModule,MatInputModule,MatCardModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule];

@NgModule({
    imports: [...myModules],
    exports: [...myModules],
})

export class MaterialModule { }