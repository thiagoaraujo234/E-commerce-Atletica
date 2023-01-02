import { ConfirmarCompraComponent } from './../confirmar-compra/confirmar-compra.component';
import { OpcPagamentoComponent } from '../opc-pagamento/opc-pagamento.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../model/produto';
import { ActivatedRoute } from '@angular/router';
import { Tipo } from '../../model/tipo';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css'],
})
export class ComprarComponent implements OnInit {
  panelOpenState = false;

  produto: Produto =
  {
    id: 0,
    preco: 100,
    desconto: 10,
    quantidade: 10,
    nome: 'teste',
    descricao: '',
    imagem: '',
    marca: '',
    tipos: [],
    link: ""
  };

  listaTipos: Tipo[] = [{descricao:'P', id_produto: 0}, {descricao:'G', id_produto: 0}, {descricao:'M', id_produto: 0}];

  tipoDoProduto: string = '';

  constructor(private dialog: MatDialog, private service: ProdutoService,private sanitizer: DomSanitizer,private route: ActivatedRoute) {}

  openDialog() {
    const dialogRef = this.dialog.open(OpcPagamentoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    let id: number = 0;
    this.route.queryParams
      .subscribe(params => {
        console.log(params['id']);
        id = params['id'];
      }
    );
    this.service.pegaUm(id).subscribe(data => {this.produto = data; this.listaTipos = data.tipos});
    console.log(this.produto);
  }

  produtoStatusCor(): string {
    // sem estoque = statusVermelho | em estoque = statusVerde
    return this.produtoEmEstoque() ? "statusVerde" : "statusVermelho";
  }

  produtoEmEstoque(): boolean {
    return this.produto != undefined && this.produto.quantidade > 0;
  }

  temPrecoInicial(): boolean {
    return true;
  }

  calculaDesconto(){
    return this.produtoPromocao() ? (this.produto.preco -(this.produto.preco / this.produto.desconto)).toFixed(2) : this.produto.preco.toFixed(2)
  }

  produtoEmEstoqueString(): string{
    return this.produtoEmEstoque() ? "Em estoque" : "Sem estoque";
  }

  produtoPromocao(): boolean {
    return this.produto != undefined && this.produto.desconto > 0;
  }

  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.service.getUrlImagem(nomeImagem));
  }

  comprarDialog(){
    const dialogRef = this.dialog.open(ConfirmarCompraComponent, {
      data: this.produto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
