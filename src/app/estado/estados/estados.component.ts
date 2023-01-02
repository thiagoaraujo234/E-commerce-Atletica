import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EstadoFormDialogComponent } from '../estado-form-dialog/estado-form-dialog.component';
import { Estado } from '../model/estado';
import { EstadoService } from '../services/estado.service';


@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  // estados: Estado[] = [
  //   {id: 1, nome: 'Tocantins', sigla: 'TO'},
  //   {id: 2, nome: 'Goiás', sigla: 'GO'},
  //   {id: 3, nome: 'São Paulo', sigla: 'SP'}
  // ] 
  //estados: Observable<Estado[]>;

  // datasource
  estados!: MatTableDataSource<Estado>;
  displayedColumns = ['nome', 'sigla', 'acao']

  constructor(
    private estadoService: EstadoService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // buscando os estados
    this.refreshTable();
    // this.estados = estadoService.list();
  }

  ngOnInit(): void {
  }

  refreshTable(): void {
    this.estadoService.list().subscribe(
      (dados) => this.estados = new MatTableDataSource(dados)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.estados.filter = filterValue.trim().toLowerCase();
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
    const dialogRef = this.dialog.open(EstadoFormDialogComponent, {
      width: '350px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(estado => {
      console.log(estado);
      this.estadoService.save(estado).subscribe(() => {
        this.refreshTable();
        this.addMessage("Inclusão realizada com sucesso.")
      } );
    });
  }

  onEdit(estado: Estado) {
    // copia Deep
    const estadoClone = JSON.parse(JSON.stringify(estado));

    const dialogRef = this.dialog.open(EstadoFormDialogComponent, {
      width: '350px',
      data: estadoClone,
    });

    dialogRef.afterClosed().subscribe(estado => {
      console.log(estado);
      this.estadoService.save(estado).subscribe(() => this.refreshTable());
    });
  }

  onDelete(estado: Estado) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Deseja remover o Estado?',
        confirmButtonLabel: 'Excluir',
        cancelButtonLabel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estadoService.delete(estado).subscribe(() => this.refreshTable());
      }
    });


  }

}
