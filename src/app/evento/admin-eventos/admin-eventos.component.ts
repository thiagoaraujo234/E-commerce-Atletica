import { MatSnackBar } from '@angular/material/snack-bar';
import { EventoFormDialogComponent } from './../evento-form-dialog/evento-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from './../services/evento.service';
import { MatTableDataSource } from '@angular/material/table';
import { Evento } from './../model/evento';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-eventos',
  templateUrl: './admin-eventos.component.html',
  styleUrls: ['./admin-eventos.component.css']
})
export class AdminEventosComponent implements OnInit {
  eventos! : MatTableDataSource<Evento>;
  displayedColumns =
  [
    'nome',
    'data',
    'descricao',
    'acao'
  ]

  constructor(
    private eventoService : EventoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.refreshTable();
  }

  public refreshTable(){
    this.eventoService.getAll().subscribe(
      (dados) => this.eventos = new MatTableDataSource(dados)
    );
  }

  ngOnInit(): void {
  }

  onEdit(evento: Evento) {
    // copia Deep
    const eventoClone = JSON.parse(JSON.stringify(evento));

    const dialogRef = this.dialog.open(EventoFormDialogComponent, {
      maxHeight: '95vh',  
      width: '700px',
      data: eventoClone,
    });

    dialogRef.afterClosed().subscribe(resultado => {

      if (resultado){
        this.eventoService.save(resultado.evento, resultado.lista).subscribe({
          next : (dados) => {
            console.log(dados);
            this.addMessage("Alteração realizada com sucesso.");
            this.eventoService.atualizaImagem(resultado.evento, dados.id);
            this.refreshTable();
          },
          error: (erro) => {
            this.addMessage("Problema ao Alterar. " + (erro as HttpErrorResponse).statusText);
          }
        });
      }
    });
  }

  onAdd(){

    const dialogRef = this.dialog.open(EventoFormDialogComponent, {
      maxHeight: '95vh',  
      width: '700px',
      data: {
        id: null,
        nome: null,
        data: null,
        imagem: null,
        descricao: null,
        atleticasParticipantes: null,
        esportes:null,
        endereco: null,
      },
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado){
        this.eventoService.save(resultado.evento, []).subscribe((dados) => {
          this.eventoService.atualizaImagem(resultado.evento, dados.id);
          this.refreshTable();
          this.addMessage("Alteração realizada com sucesso.")
        });
      }
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.eventos.filter = filterValue.trim().toLowerCase();
  }

  onDelete(evento : Evento){
    this.eventoService.delete(evento).subscribe(() => this.refreshTable());
  }

  private addMessage(message: string) {
    this.snackBar.open(message, 'fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }
}
