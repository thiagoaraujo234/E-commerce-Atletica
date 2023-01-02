import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './autenticacao/services/login.service';
import { Usuario } from './usuario/model/usuario';
import { UsuarioService } from './usuario/services/usuario.service';
import { UsuarioFormDialogComponent } from './usuario/usuario-form-dialog/usuario-form-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario! : Usuario;

  title = 'grupo2';

  mostrarMenu:boolean = false;

  constructor(
    private loginService: LoginService,
    // private dialog: MatDialog,
    // private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService,
    ){
    
    this.refreshUsuario();
  }
  ngOnInit(){
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  logout(){
    this.loginService.logout();
    window.location.href = "/autenticacao";
  }

  refreshUsuario() {
    this.loginService.retornaUsuario().subscribe((dado) => this.usuario = dado);
  }

  // editarPerfil() {
  //   // copia Deep
  //   const usuarioClone = JSON.parse(JSON.stringify(this.usuario));

  //   console.log(usuarioClone);

  //   const dialogRef = this.dialog.open(UsuarioFormDialogComponent, {
  //     width: '350px',
  //     data: usuarioClone,
  //   });

  //   dialogRef.afterClosed().subscribe(usuario => {
  //     if (usuario == undefined) 
  //     return ;
  //     console.log(usuario);
  //     this.usuarioService.edit(usuario).subscribe(() => this.refreshUsuario());
  //     this.addMessage("Alteração realizada com sucesso.")
  //   });
  // }

  // private addMessage(message: string) {
  //   this.snackBar.open(message, 'fechar', {
  //     duration: 2000,
  //     verticalPosition: 'top',
  //     horizontalPosition: 'center'
  //   })
  // }
}
