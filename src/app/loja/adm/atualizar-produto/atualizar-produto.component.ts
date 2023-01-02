import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-atualizar-produto',
  templateUrl: './atualizar-produto.component.html',
  styleUrls: ['./atualizar-produto.component.css'],
})
export class AtualizarProdutoComponent implements OnInit {
  imagemFile!: File;
  preview!: string;
  formProduto!: FormGroup;
  produto!: Produto;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private service: ProdutoService,
    public dialogRef: MatDialogRef<AtualizarProdutoComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.createForm(this.data);
  }

  createForm(produto: Produto) {
    this.formProduto = new FormGroup({
      nome: new FormControl(produto.nome),
      preco: new FormControl(produto.preco),
      desconto: new FormControl(produto.desconto),
      quantidade: new FormControl(produto.quantidade),
      descricao: new FormControl(produto.descricao),
      marca: new FormControl(produto.marca),
      link: new FormControl(produto.link)
    });
  }

  editar() {
    this.produto = this.formProduto.value;
    console.log(this.data.id);
    this.service.edit(this.produto, this.data.id).subscribe((data) => console.log(data));
    return this.dialogRef.close();
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

  removerImagem() {
    this.preview = '';
  }
}
