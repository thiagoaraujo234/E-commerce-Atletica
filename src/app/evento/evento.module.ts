import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { EventoRoutingModule } from './evento-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { EventoDialogComponent } from './evento-dialog/evento-dialog.component';
import { AdminEventosComponent } from './admin-eventos/admin-eventos.component';
import { EventoFormDialogComponent } from './evento-form-dialog/evento-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    EventosComponent,
    EventoDialogComponent,
    AdminEventosComponent,
    EventoFormDialogComponent,
  ],
  imports: [
    CommonModule,
    EventoRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
    // MatDialogRef,
  ]
})
export class EventoModule { }
