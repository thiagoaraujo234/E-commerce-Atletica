import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminParceirosComponent } from './admin-parceiros/admin-parceiros.component';
import { ParceirosComponent } from './parceiros/parceiros.component';

const routes: Routes = [
  { path: '', component: ParceirosComponent },
  {path : "admin", component : AdminParceirosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParceiroRoutingModule {

 }
