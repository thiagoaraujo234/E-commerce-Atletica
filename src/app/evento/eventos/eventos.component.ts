import { EventoDialogComponent } from './../evento-dialog/evento-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Evento } from './../model/evento';
import { EventoService } from './../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { delay } from 'rxjs';
import { LoginService } from 'src/app/autenticacao/services/login.service';
import { Usuario } from 'src/app/usuario/model/usuario';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos!: Evento[];
  usuario!: Usuario;

  public selected = 0;

  constructor(
    private eventoService : EventoService,
    private loginService : LoginService,
    private tabs : MatTabsModule,
    private dialog : MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.refreshEventos();
    this.refreshUsuario();
    console.log(this.usuario);
  }

  ngOnInit(): void {
  }

  public refreshEventos(){
    this.eventoService.getAll().subscribe((dados) => this.eventos = dados);
  }

  public formataData(data : Date){
    const newDate = new Date(data);
    const dia = (newDate.getDay() >= 10)? newDate.getDay().toString() : "0" + newDate.getDay();
    const mes = (newDate.getMonth() >= 10)? newDate.getMonth().toString() : "0" + newDate.getDay();
    return dia + "/" + mes + "/" + newDate.getFullYear();
  }

  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.eventoService.getUrlImagem(nomeImagem));
  }

  refreshUsuario() {
    return this.loginService.retornaUsuario().subscribe((dado) => {this.usuario = dado as Usuario});
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
}
