import { AdminEventosComponent } from './admin-eventos/admin-eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  {path : "", component : EventosComponent},
  {path : "admin", component : AdminEventosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
