import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Esporte } from '../model/esporte';

@Component({
  selector: 'app-esporte-form-dialog',
  templateUrl: './esporte-form-dialog.component.html',
  styleUrls: ['./esporte-form-dialog.component.css']
})
export class EsporteFormDialogComponent implements OnInit {
  formEsporte!: FormGroup;

  imagemFile!: File;
  preview!: string;

  constructor(
    public dialogRef: MatDialogRef<EsporteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Esporte,
    private dialog: MatDialog
  ) {
    this.createForm(data);  
  }

  ngOnInit(): void {
  }

  createForm(esporte: Esporte) {
    this.formEsporte = new FormGroup({
      id: new FormControl(esporte.id),
      nome: new FormControl(esporte.nome, [Validators.required, Validators.minLength(2)]),
      modalidade: new FormControl(esporte.modalidade, [Validators.required ]),
      imagemFile: new FormControl(),
      nomeImagem: new FormControl()
      
      })
      
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.formEsporte.invalid)
      return;
    const esporte = this.formEsporte.value;

    esporte.imagemFile = this.imagemFile;
    esporte.nomeImagem = this.imagemFile.name;

    return this.dialogRef.close(esporte);
  }

  get nome() {
    return this.formEsporte.get('nome')!;
  }
  get modalidade() {
    return this.formEsporte.get('modalidade')!;
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
