import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsporteRoutingModule } from './esporte-routing.module';
import { MatCardModule } from '@angular/material/card';
import { UsuarioRoutingModule } from '../usuario/usuario-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EsportesComponent } from './esportes/esportes.component';
import { EsporteFormDialogComponent } from './esporte-form-dialog/esporte-form-dialog.component';


@NgModule({
  declarations: [

    EsportesComponent,
    EsporteFormDialogComponent

  ],
  imports: [
    CommonModule,
    EsporteRoutingModule,
    CommonModule,
    UsuarioRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]

})
export class EsporteModule { }
