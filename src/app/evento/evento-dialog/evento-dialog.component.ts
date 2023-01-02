import { Evento } from './../model/evento';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from './../services/evento.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-evento-dialog',
  templateUrl: './evento-dialog.component.html',
  styleUrls: ['./evento-dialog.component.css']
})
export class EventoDialogComponent implements OnInit {

  public evento! : Evento;

  constructor(
    private eventoService : EventoService,
    public dialogRef : MatDialogRef<EventoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Evento,
    private sanitizer: DomSanitizer,
  ) {
    this.resetEvento();
   }

  ngOnInit(): void {
  }

  resetEvento(): void {
    this.eventoService.getById(this.data.id).subscribe((data) => this.evento = data);
    console.log(this.data)
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

}
