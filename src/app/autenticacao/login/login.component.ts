import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/model/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { LoginFormDialogComponent } from '../login-form-dialog/login-form-dialog.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
 


  constructor(
      private loginService: LoginService,
      private usuarioService: UsuarioService,
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private router: Router) {

    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    // this.verificaLogado();
   }

  ngOnInit(): void {
  }

  login() {

    console.log(this.form.value);
    this.loginService
      .autenticar(this.form.get("email")?.value, this.form.get("senha")?.value)
      .subscribe({
        next: () => {
            console.log("Autenticação com sucesso.");
            this.router.navigateByUrl('/home')
          
          },
        error: (erro) => {
          alert('Usuário ou senha inválido');
          console.log(erro);
        }
      });

  }

  getErrorMessage() {
    if (this.form.get("email")?.hasError('required')) {
      return 'O email deve ser informado.';
    }

    return this.form.get("email")?.hasError('email') ? 'Email inválido' : '';
  }
  onAdd() {
    //this.router.navigate(['new'], {relativeTo: this.activateRoute})
    const dialogRef = this.dialog.open(LoginFormDialogComponent, {
      width: '350px',
      data: { nome: null, email: null, senha: null, telefone: null, cidade: {nome: null} },
    });

    dialogRef.afterClosed().subscribe((usuario) => {
      if (usuario == undefined) 
        return ;
      console.log(usuario);
      this.usuarioService.save(usuario).subscribe(() => {
        this.addMessage("Inclusão realizada com sucesso.")
      });
      
    });
  }
 
  private addMessage(message: string) {
    this.snackBar.open(message, 'fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }

  verificaLogado() {
    this.loginService.retornaUsuario().subscribe((dado) => {
      if (dado.nome)
        window.location.href = "/home";
    });
  }
  
}
