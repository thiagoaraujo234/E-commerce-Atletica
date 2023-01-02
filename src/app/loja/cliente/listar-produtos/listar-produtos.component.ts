import { Produto } from '../../model/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  listaProdutos: Produto[] = [
    {
      id: 1,
      preco: 100,
      desconto: 10,
      quantidade: 10,
      nome: 'Nome teste',
      descricao: 'Descrição qualquer',
      imagem: 'path',
      marca: 'Marca 1',
      tipos: [],
      link: ""
    },
    {
      id: 1,
      preco: 100000,
      desconto: 10,
      quantidade: 0,
      nome: 'Hutao',
      descricao: 'Descrição qualquer',
      imagem: '',
      marca: 'Marca 1',
      tipos: [],
      link: ""
    },
    {
      id: 1,
      preco: 100,
      desconto: 10,
      quantidade: 10,
      nome: 'Nome teste',
      descricao: 'Descrição qualquer',
      imagem: 'path',
      marca: 'Marca 1',
      tipos: [],
      link: ""
    },
    {
      id: 1,
      preco: 100,
      desconto: 10,
      quantidade: 10,
      nome: 'Nome teste',
      descricao: 'Descrição qualquer',
      imagem: 'path',
      marca: 'Marca 1',
      tipos: [],
      link: ""
    }
  ];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.list().subscribe(dados => this.listaProdutos = dados);
  }

  applyFilter(event: Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.produtoService
      .pegaPorNome(filterValue)
      .subscribe((data) => (this.listaProdutos = data));
  }

}
