import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParceiroRoutingModule } from './parceiro-routing.module';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { ParceiroFormDialogComponent } from './parceiro-form-dialog/parceiro-form-dialog.component';

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
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminParceirosComponent } from './admin-parceiros/admin-parceiros.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    ParceirosComponent,
    ParceiroFormDialogComponent,
    AdminParceirosComponent
  ],
  imports: [
    CommonModule,
    ParceiroRoutingModule,
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
    FlexLayoutModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSliderModule,
    FormsModule
  ]
})
export class ParceiroModule { }
