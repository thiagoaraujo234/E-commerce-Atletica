import { Produto } from '../../model/produto';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos-relacionados',
  templateUrl: './produtos-relacionados.component.html',
  styleUrls: ['./produtos-relacionados.component.css']
})
export class ProdutosRelacionadosComponent implements OnInit {

  listaProdutos: Produto[] = []
  constructor(private service: ProdutoService) { }

  ngOnInit(): void {
    this.service.list().subscribe(data => this.listaProdutos = data)
  }

}
