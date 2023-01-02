import { Produto } from './../../model/produto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opc-pagamento',
  templateUrl: './opc-pagamento.component.html',
  styleUrls: ['./opc-pagamento.component.css']
})
export class OpcPagamentoComponent implements OnInit {

  parcelas:number = 12;
  @Input() produto: Produto = {
    id: 0,
    preco: 230,
    quantidade: 0,
    nome: '',
    descricao: '',
    imagem: '',
    marca: '',
    tipos: [],
    desconto: 10,
    link: ""
    //promocao: false
  }
  oferta: string = (this.produto.preco -(this.produto.preco / this.produto.desconto)).toFixed(2);

  constructor() { }

  ngOnInit(): void {
  }

}
