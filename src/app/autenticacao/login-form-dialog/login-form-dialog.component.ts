import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaCidadeDialogComponent } from 'src/app/cidade/consulta-cidade-dialog/consulta-cidade-dialog.component';
import { Usuario } from 'src/app/usuario/model/usuario';


@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['./login-form-dialog.component.css']
})
export class LoginFormDialogComponent implements OnInit {
  formLogin!: FormGroup;

  imagemFile!: File;
  preview!: string;

  constructor(
    public dialogRef: MatDialogRef<LoginFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog
  ) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(usuario: Usuario) {
    this.formLogin = new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(usuario.email, [Validators.required, Validators.email]),
      senha: new FormControl(usuario.senha, [Validators.required, Validators.minLength(6)]),
      codArea: new FormControl(usuario.codArea, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      telefone: new FormControl(usuario.telefone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      cidade: new FormGroup({
        id: new FormControl(usuario.cidade.id),
        nome: new FormControl(usuario.cidade.nome)
      }),
      imagemFile: new FormControl(),
      nomeFile: new FormControl()
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.formLogin.invalid)
      return;
    const usuario = this.formLogin.value;
    usuario.imageFile = this.imagemFile;
    usuario.nomeFile = this.imagemFile.name;

    return this.dialogRef.close(usuario);
  }

  get nome() {
    return this.formLogin.get('nome')!;
  }
  get codArea() {
    return this.formLogin.get('codArea')!;
  }
  get telefone() {
    return this.formLogin.get('telefone')!;
  }
  get email() {
    return this.formLogin.get('email')!;
  }
  get senha() {
    return this.formLogin.get('senha')!;
  }

  openConsultaCidadeDialog() {
    const dialogRef = this.dialog.open(ConsultaCidadeDialogComponent, {
      width: '450px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // atualizando a cidade do formgroup
      this.formLogin.patchValue({
        cidade:result
      })
    });
  }

  handleFile(target : any) {
      if (target instanceof EventTarget) {
        let element = target as HTMLInputElement;
        let files = element.files;
        if (files) {
          this.imagemFile = files[0];
        }
      }
      // gerando o preview da imagem
      const reader = new FileReader();
      // convertendo em base 64
      reader.onload = (event:any) => this.preview = event.target.result;
      reader.readAsDataURL(this.imagemFile);
  }

}
