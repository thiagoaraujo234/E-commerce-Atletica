import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoForm } from '../../model/produto-form';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css'],
})
export class CadastrarProdutoComponent implements OnInit {
  produto!: ProdutoForm;
  formProduto!: FormGroup;
  imagemFile!: File;
  preview!: string;
  constructor(private service: ProdutoService, private router: Router,public dialogRef: MatDialogRef<CadastrarProdutoComponent>) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formProduto = new FormGroup({
      nome: new FormControl(),
      preco: new FormControl(),
      desconto: new FormControl(),
      quantidade: new FormControl(),
      descricao: new FormControl(),
      imagem: new FormControl(),
      marca: new FormControl(),
      link: new FormControl(),
    });
  }
  handleFile(target: any) {
    if (target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      let files = element.files;
      if (files) {
        this.imagemFile = files[0];
      }
    }
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(this.imagemFile);
  }

  send() {
    this.produto = this.formProduto.value;
    this.produto.imagem = this.imagemFile;
    this.service.save(this.produto).subscribe((data) => console.log(data));
    this.router.navigate(['/todos-produtos']);
    return this.dialogRef.close();
  }

  cancelar() {
    return this.dialogRef.close();
  }
  
  removerImagem() {
    this.preview = '';
  }
}
