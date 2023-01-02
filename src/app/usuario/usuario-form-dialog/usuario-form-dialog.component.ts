import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaCidadeDialogComponent } from 'src/app/cidade/consulta-cidade-dialog/consulta-cidade-dialog.component';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-usuario-form-dialog',
  templateUrl: './usuario-form-dialog.component.html',
  styleUrls: ['./usuario-form-dialog.component.css']
})
export class UsuarioFormDialogComponent implements OnInit {
  formUsuario!: FormGroup;

  imagemFile!: File;
  preview!: string;

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog
  ) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(usuario: Usuario) {
    this.formUsuario = new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(usuario.email, [Validators.required, Validators.email]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
    if (this.formUsuario.invalid)
      return;
    const usuario = this.formUsuario.value;
    usuario.imageFile = this.imagemFile;
    usuario.nomeFile = this.imagemFile.name;

    return this.dialogRef.close(usuario);
  }

  get nome() {
    return this.formUsuario.get('nome')!;
  }
  get codArea() {
    return this.formUsuario.get('codArea')!;
  }
  get telefone() {
    return this.formUsuario.get('telefone')!;
  }
  get email() {
    return this.formUsuario.get('email')!;
  }
  get senha() {
    return this.formUsuario.get('senha')!;
  }

  openConsultaCidadeDialog() {
    const dialogRef = this.dialog.open(ConsultaCidadeDialogComponent, {
      width: '450px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // atualizando a cidade do formgroup
      this.formUsuario.patchValue({
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
