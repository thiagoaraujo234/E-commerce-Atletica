import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EsporteFormDialogComponent } from '../esporte-form-dialog/esporte-form-dialog.component';
import { Esporte } from '../model/esporte';
import { EsporteService } from '../services/esporte.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-esportes',
  templateUrl: './esportes.component.html',
  styleUrls: ['./esportes.component.css']
})
export class EsportesComponent implements OnInit {

  esportes!: MatTableDataSource<Esporte>;
  displayedColumns = ['nome', 'modalidade', 'acao']

  constructor(
    private esporteService: EsporteService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer)
     {
      this.refreshTable();
     }

  ngOnInit(): void {
  }


  refreshTable(): void {
    this.esporteService.list().subscribe(
      (dados) => this.esportes = new MatTableDataSource(dados)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.esportes.filter = filterValue.trim().toLowerCase();
  }
  private addMessage(message: string) {
    this.snackBar.open(message, 'fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }

  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.esporteService.getUrlImagem(nomeImagem));
  }

  onAdd() {
    //this.router.navigate(['new'], {relativeTo: this.activateRoute})
    const dialogRef = this.dialog.open(EsporteFormDialogComponent, {
      width: '350px',
      data: { nome: null, modalidade: null },
    });

    dialogRef.afterClosed().subscribe(esporte => {
      console.log(esporte);
      this.esporteService.save(esporte).subscribe(() => {
        this.refreshTable();
        this.addMessage("Inclusão realizada com sucesso.")
      });
    });

  }
  onEdit(esporte: Esporte) {
    // copia Deep
    const esporteClone = JSON.parse(JSON.stringify(esporte));

    const dialogRef = this.dialog.open(EsporteFormDialogComponent, {
      width: '350px',
      data: esporteClone,
    });

    dialogRef.afterClosed().subscribe(esporte => {
      if (esporte == undefined) 
      return ;
      console.log(esporte);
      this.esporteService.update(esporte).subscribe(() => this.refreshTable());
    });
  }

  onDelete(esporte: Esporte) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Deseja remover o Esporte ?',
        confirmButtonLabel: 'Excluir',
        cancelButtonLabel: 'Cancelar'
       
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.esporteService.delete(esporte).subscribe(() => this.refreshTable());
      }
    });

  }
}