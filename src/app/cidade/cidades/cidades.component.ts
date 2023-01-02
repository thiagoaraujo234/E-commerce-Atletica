import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CidadeFormDialogComponent } from '../cidade-form-dialog/cidade-form-dialog.component';
import { Cidade } from '../model/cidade';
import { CidadeService } from '../services/cidade.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit {

  cidades!: MatTableDataSource<Cidade>;
  displayedColumns = ['nome', 'sigla', 'acao']

  constructor(
    private cidadeService: CidadeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // buscando as cidades
    this.refreshTable();
  }

  ngOnInit(): void {
  }

  refreshTable(): void {
    this.cidadeService.list().subscribe(
      (dados) => this.cidades = new MatTableDataSource(dados)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cidades.filter = filterValue.trim().toLowerCase();
  }

  private addMessage(message:string) {
    this.snackBar.open(message, 'fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }

  onAdd() {
    //this.router.navigate(['new'], {relativeTo: this.activateRoute})
    const dialogRef = this.dialog.open(CidadeFormDialogComponent, {
      width: '350px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(cidade => {
      console.log(cidade);
      this.cidadeService.save(cidade).subscribe(() => {
        this.refreshTable();
        this.addMessage("Inclusão realizada com sucesso.")
      } );
    });
  }

  onEdit(cidade: Cidade) {
    // copia Deep
    const cidadeClone = JSON.parse(JSON.stringify(cidade));

    const dialogRef = this.dialog.open(CidadeFormDialogComponent, {
      width: '350px',
      data: cidadeClone,
    });

    dialogRef.afterClosed().subscribe(cidade => {
      console.log(cidade);
      this.cidadeService.save(cidade).subscribe(() => this.refreshTable());
    });
  }

  onDelete(cidade: Cidade) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Deseja remover o Cidade?',
        confirmButtonLabel: 'Excluir',
        cancelButtonLabel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cidadeService.delete(cidade).subscribe(() => this.refreshTable());
      }
    });
  }

}
