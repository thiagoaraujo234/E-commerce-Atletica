import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Parceiro } from '../model/parceiro';
import { ParceiroService } from '../services/parceiro.service';
import { ParceiroFormDialogComponent } from '../parceiro-form-dialog/parceiro-form-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/usuario/model/usuario';
import { LoginService } from 'src/app/autenticacao/services/login.service';

@Component({
  selector: 'app-admin-parceiros',
  templateUrl: './admin-parceiros.component.html',
  styleUrls: ['./admin-parceiros.component.css']
})
export class AdminParceirosComponent implements OnInit {

   // datasource
   parceiros!: MatTableDataSource<Parceiro>;
   usuario!: Usuario;

   displayedColumns = ['imageUrl', 'nome', 'descricao', 'acao']

   constructor(
    private parceiroService: ParceiroService,
    private loginService : LoginService,
     private router: Router,
     private activateRoute: ActivatedRoute,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private sanitizer: DomSanitizer
   ) {
     // buscando os parceiros
     this.refreshTable();

   }

   refreshUsuario() {
    return this.loginService.retornaUsuario().subscribe((dado) => {this.usuario = dado as Usuario})
  }

   ngOnInit(): void {
   }

   getImagem(nomeImagem: string) {
     return this.sanitizer.bypassSecurityTrustUrl(this.parceiroService.getUrlImagem(nomeImagem));
   }

   refreshTable(): void {
     this.parceiroService.list().subscribe(
       (dados) => this.parceiros = new MatTableDataSource(dados)
     );
   }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.parceiros.filter = filterValue.trim().toLowerCase();
   }

   private addMessage(message: string) {
     this.snackBar.open(message, 'fechar', {
       duration: 2000,
       verticalPosition: 'top',
       horizontalPosition: 'center'
     })
   }

   onAdd() {
     //this.router.navigate(['new'], {relativeTo: this.activateRoute})
     const dialogRef = this.dialog.open(ParceiroFormDialogComponent, {
       width: '350px',
       data: { nome: null, descricao: null },
     });

     dialogRef.afterClosed().subscribe(parceiro => {
       if (parceiro == undefined)
         return ;
       console.log(parceiro);
       this.parceiroService.save(parceiro).subscribe(() => {
         this.refreshTable();
         this.addMessage("Inclusão realizada com sucesso.")
       });

     });
   }

   onEdit(parceiro: Parceiro) {
     // copia Deep
     const parceiroClone = JSON.parse(JSON.stringify(parceiro));

     const dialogRef = this.dialog.open(ParceiroFormDialogComponent, {
       width: '350px',
       data: parceiroClone,
     });

     dialogRef.afterClosed().subscribe(parceiro => {
       if (parceiro == undefined)
       return ;
        this.addMessage("Alteração realizada com sucesso.");
       console.log(parceiro);
       this.parceiroService.edit(parceiro).subscribe(() => this.refreshTable());
     });
   }


   onDelete(parceiro: Parceiro) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       width: '350px',
       data: {
         title: 'Deseja remover o Parceiro?',
         confirmButtonLabel: 'Excluir',
         cancelButtonLabel: 'Cancelar'
       }
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         this.parceiroService.delete(parceiro).subscribe(() => this.refreshTable());
       }
     });

   }

 }
