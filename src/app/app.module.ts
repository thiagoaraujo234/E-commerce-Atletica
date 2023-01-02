import { NavbarComponent } from './loja/adm/navbar/navbar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EsportesComponent } from './esporte/esportes/esportes.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ProdutoComponent } from './loja/cliente/produto/produto.component';
import { ComprarComponent } from './loja/cliente/comprar/comprar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ListarProdutosComponent } from './loja/cliente/listar-produtos/listar-produtos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OpcPagamentoComponent } from './loja/cliente/opc-pagamento/opc-pagamento.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutosRelacionadosComponent } from './loja/cliente/produtos-relacionados/produtos-relacionados.component';
import { MatRadioModule } from '@angular/material/radio';
import { CadastrarProdutoComponent } from './loja/adm/cadastrar-produto/cadastrar-produto.component';
import { TodosProdutosComponent } from './loja/adm/todos-produtos/todos-produtos.component';
import { AtualizarProdutoComponent } from './loja/adm/atualizar-produto/atualizar-produto.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthInterceptor } from './autenticacao/interceptors/auth.interceptor';
import { UnauathorizedInterceptor } from './autenticacao/interceptors/unauathorized.interceptor';
import { HomesComponent } from './home/homes/homes.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PedidosComponent } from './loja/adm/pedidos/pedidos.component';
import { ConfirmarCompraComponent } from './loja/cliente/confirmar-compra/confirmar-compra.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TelaSucessoComponent } from './loja/cliente/tela-sucesso/tela-sucesso.component';
import { TelaFracassoComponent } from './loja/cliente/tela-fracasso/tela-fracasso.component';
// import { EventosComponent } from './evento/eventos/eventos.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    // EventosComponent,
    ProdutoComponent,
    ComprarComponent,
    ListarProdutosComponent,
    OpcPagamentoComponent,
    ProdutosRelacionadosComponent,
    CadastrarProdutoComponent,
    TodosProdutosComponent,
    AtualizarProdutoComponent,
    HomesComponent,
    HomeListComponent,
    PedidosComponent,
    ConfirmarCompraComponent,
    NavbarComponent,
    TelaSucessoComponent,
    TelaFracassoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauathorizedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
