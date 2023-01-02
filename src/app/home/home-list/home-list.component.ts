import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/autenticacao/services/login.service';
import { Esporte } from 'src/app/esporte/model/esporte';
import { EsporteService } from 'src/app/esporte/services/esporte.service';
import { EventoDialogComponent } from 'src/app/evento/evento-dialog/evento-dialog.component';
import { Evento } from 'src/app/evento/model/evento';
import { EventoService } from 'src/app/evento/services/evento.service';
import { Produto } from 'src/app/loja/model/produto';
import { ProdutoService } from 'src/app/loja/services/produto.service';
import { Parceiro } from 'src/app/parceiro/model/parceiro';
import { ParceiroService } from 'src/app/parceiro/services/parceiro.service';
import { Usuario } from 'src/app/usuario/model/usuario';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  eventos!: Evento[];

  parceiros!: Parceiro[];

  esportes!: Esporte[];

  usuario!: Usuario;

  listaProdutos!: Produto[] 
  // = [
  //   {
  //     id: 1,
  //     preco: 100,
  //     desconto: 10,
  //     quantidade: 10,
  //     nome: 'Nome teste',
  //     descricao: 'Descrição qualquer',
  //     imagem: '',
  //     marca: 'Marca 1',
  //     tipos: []
  //   },
  //   {
  //     id: 1,
  //     preco: 100000,
  //     desconto: 10,
  //     quantidade: 0,
  //     nome: 'Hutao',
  //     descricao: 'Descrição qualquer',
  //     imagem: '',
  //     marca: 'Marca 1',
  //     tipos: []
  //   },
  //   {
  //     id: 1,
  //     preco: 100,
  //     desconto: 10,
  //     quantidade: 10,
  //     nome: 'Nome teste',
  //     descricao: 'Descrição qualquer',
  //     imagem: '',
  //     marca: 'Marca 1',
  //     tipos: []
  //   },
  // ];

  constructor(
    private eventoService : EventoService,
    private parceiroService : ParceiroService,
    private loginService : LoginService,
    private esporteService : EsporteService,
    private dialog : MatDialog,
    private sanitizer: DomSanitizer,
    private produtoService: ProdutoService
    ) {
      this.refreshEventos();
      this.refreshUsuario();
      this.refreshParceiros();
      this.refreshProdutos();
      this.refreshEsporte();
    }

  ngOnInit(): void {
  }

  refreshUsuario() {
    return this.loginService.retornaUsuario().subscribe((dado) => {this.usuario = dado as Usuario});
  }

  /** -------[EVENTOS]--------- */

  getImagemEvento(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.eventoService.getUrlImagem(nomeImagem));
  }

  public refreshEventos(){
    this.eventoService.getAll().subscribe((dados) => {
      if (!this.eventos)
        this.eventos = Array<Evento>();
      
      for (let i = 0; i < 3 && i < dados.length; i++){
        this.eventos.push(dados[i]);
      }
    });
  }

  public formataData(data : Date){
    const newDate = new Date(data);
    const dia = (newDate.getDay() >= 10)? newDate.getDay().toString() : "0" + newDate.getDay();
    const mes = (newDate.getMonth() >= 10)? newDate.getMonth().toString() : "0" + newDate.getDay();
    return dia + "/" + mes + "/" + newDate.getFullYear();
  }

  public onChange(index : number){
    const evento = this.eventos[index];
    console.log(evento);
    this.dialog.open(EventoDialogComponent, {
      width : '750px',
      height : '80vh',
      data : evento,
    });
  }

  /** ----------[PARCEIROS]---------- */
  refreshParceiros(): void {
    this.parceiroService.list().subscribe((dados) => {
      if (!this.parceiros)
        this.parceiros = Array<Parceiro>();
    
      for (let i = 0; i < 3 && i < dados.length; i++){
        this.parceiros.push(dados[i]);
      }
    });
  }

  getImagemParceiro(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.parceiroService.getUrlImagem(nomeImagem));
  } 

  /** ----------[PRODUTOS]---------- */
  refreshProdutos(): void {
    this.produtoService.list().subscribe((dados) => {
      if (!this.listaProdutos)
        this.listaProdutos = Array<Produto>();

      for (let i = 0; i < 2 && i < dados.length; i++){
        this.listaProdutos.push(dados[i]);
      }
    });
  }

  getImagemProduto(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.produtoService.getUrlImagem(nomeImagem));
  } 

  /** ----------[ESPORTES]---------- */
  refreshEsporte(): void {
    this.esporteService.list().subscribe((dados) => {
      if (!this.esportes)
      this.esportes = Array<Esporte>();

      for (let i = 0; i < 2 && i < dados.length; i++){
        this.esportes.push(dados[i]);
      }
    });
  }

  getImagemEsporte(nomeImagem : string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.esporteService.getUrlImagem(nomeImagem));
  }
}
