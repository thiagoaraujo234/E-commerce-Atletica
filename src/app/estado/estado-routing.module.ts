import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoFormComponent } from './estado-form/estado-form.component';
import { EstadosComponent } from './estados/estados.component';

const routes: Routes = [
  { path: '', component: EstadosComponent },
  { path: 'new', component: EstadoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoRoutingModule { }
