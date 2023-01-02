import { TelaFracassoComponent } from './loja/cliente/tela-fracasso/tela-fracasso.component';
import { TelaSucessoComponent } from './loja/cliente/tela-sucesso/tela-sucesso.component';
import { CadastrarProdutoComponent } from './loja/adm/cadastrar-produto/cadastrar-produto.component';
import { TodosProdutosComponent } from './loja/adm/todos-produtos/todos-produtos.component';
import { ListarProdutosComponent } from './loja/cliente/listar-produtos/listar-produtos.component';

import { ComprarComponent } from './loja/cliente/comprar/comprar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeListComponent } from './home/home-list/home-list.component';
import { PedidosComponent } from './loja/adm/pedidos/pedidos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'autenticacao' },
  {
    path: 'esporte',
    loadChildren: () => import('./esporte/esporte.module').then(m => m.EsporteModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'evento',
    loadChildren: () => import('./evento/evento.module').then(m => m.EventoModule)
  },
  {
    path: 'cidade',
    loadChildren: () => import('./cidade/cidade.module').then(m => m.CidadeModule)
  },
  {
    path: 'parceiro',
    loadChildren: () => import('./parceiro/parceiro.module').then(m => m.ParceiroModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule)
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path:'loja',
    component: ListarProdutosComponent
  },
  {
    path:'cadastrar-produto',
    component: CadastrarProdutoComponent
  },
  {
    path:'pedidos',
    component: PedidosComponent
  },
  {
    path:'comprar',
    component: ComprarComponent
  },
  {
    path:'todos-produtos',
    component: TodosProdutosComponent
  },
  {
    path:'tela-sucesso',
    component: TelaSucessoComponent
  },
  {
    path:'tela-fracasso',
    component: TelaFracassoComponent
  },
  {
    path:'home',
    component: HomeListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
