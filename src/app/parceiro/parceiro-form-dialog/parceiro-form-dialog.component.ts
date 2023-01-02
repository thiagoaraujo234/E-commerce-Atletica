import { ParceiroService } from './../services/parceiro.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Parceiro } from './../model/parceiro';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-parceiro-form-dialog',
  templateUrl: './parceiro-form-dialog.component.html',
  styleUrls: ['./parceiro-form-dialog.component.css']
})
export class ParceiroFormDialogComponent implements OnInit {

  formParceiro!: FormGroup;

  imagemFile!: File;
  preview!: string;

  constructor(
    public dialogRef: MatDialogRef<ParceiroFormDialogComponent>,
    private parceiroService: ParceiroService,
    @Inject(MAT_DIALOG_DATA) public data: Parceiro,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }


  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.parceiroService.getUrlImagem(nomeImagem));
  }


  createForm(parceiro: Parceiro) {
    this.formParceiro = new FormGroup({
      id: new FormControl(parceiro.id),
      nome: new FormControl(parceiro.nome, [Validators.required, Validators.minLength(2)]),
      descricao: new FormControl(parceiro.descricao),
      imagemFile: new FormControl(),
      nomeFile: new FormControl()
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.formParceiro.invalid)
      return;
    const parceiro = this.formParceiro.value;
    if (parceiro.imagemFile != null){
    parceiro.imageFile = this.imagemFile;
    parceiro.nomeFile = this.imagemFile.name;
    } else {
      parceiro.nomeImagem = this.data.nomeImagem;
    }
    return this.dialogRef.close(parceiro);
  }

  get nome() {
    return this.formParceiro.get('nome')!;
  }
  get descricao() {
    return this.formParceiro.get('descricao')!;
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
