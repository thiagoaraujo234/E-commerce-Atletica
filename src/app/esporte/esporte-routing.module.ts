import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsportesComponent } from './esportes/esportes.component';

const routes: Routes = [
  { path: '', component: EsportesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsporteRoutingModule { }
