import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadoRoutingModule } from './estado-routing.module';
import { EstadosComponent } from './estados/estados.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EstadoFormComponent } from './estado-form/estado-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoFormDialogComponent } from './estado-form-dialog/estado-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    EstadosComponent,
    EstadoFormComponent,
    EstadoFormDialogComponent
  ],
  imports: [
    CommonModule,
    EstadoRoutingModule,
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
    MatSnackBarModule
  ]
})
export class EstadoModule { }
