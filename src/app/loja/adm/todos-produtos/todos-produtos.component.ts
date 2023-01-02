import { AtualizarProdutoComponent } from './../atualizar-produto/atualizar-produto.component';
import { CadastrarProdutoComponent } from './../cadastrar-produto/cadastrar-produto.component';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../model/produto';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-todos-produtos',
  templateUrl: './todos-produtos.component.html',
  styleUrls: ['./todos-produtos.component.css'],
})
export class TodosProdutosComponent implements OnInit {
  produtos!: Produto[];
  colunas = [
    'imagemUrl',
    'nome',
    'preco',
    'desconto',
    'quantidade',
    'marca',
    'tipos',
    'acao',
  ];

  constructor(private dialog: MatDialog, private service: ProdutoService) {
    //this.refreshTable();
  }

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista() {
    this.service.list().subscribe((data) => {
      this.produtos = data;
      console.log(data);
    });
  }

  getImagem(nomeImagem: string) {
    return this.service.getUrlImagem(nomeImagem);
  }

  refreshTable(): void {}

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.service
      .pegaPorNome(filterValue)
      .subscribe((data) => (this.produtos = data));
  }

  private addMessage(message: string) {}

  openDialogCadastrar() {
    const dialogRef = this.dialog.open(CadastrarProdutoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.atualizarLista();
    });
  }

  openDialogAtualizar(produto: Produto) {
    const produtoClone = JSON.parse(JSON.stringify(produto));
    console.log(produtoClone);
    const dialogRef = this.dialog.open(AtualizarProdutoComponent, {
      width: '5000px',
      data: produtoClone,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.atualizarLista();
    });
  }
}
