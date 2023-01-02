import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CidadeRoutingModule } from './cidade-routing.module';
import { CidadesComponent } from './cidades/cidades.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CidadeFormDialogComponent } from './cidade-form-dialog/cidade-form-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConsultaCidadeDialogComponent } from './consulta-cidade-dialog/consulta-cidade-dialog.component';

@NgModule({
  declarations: [
    CidadesComponent,
    CidadeFormDialogComponent,
    ConsultaCidadeDialogComponent
  ],
  imports: [
    CommonModule,
    CidadeRoutingModule,
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
    MatAutocompleteModule
  ]
})
export class CidadeModule { }
