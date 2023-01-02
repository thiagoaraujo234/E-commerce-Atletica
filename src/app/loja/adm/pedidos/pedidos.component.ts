import { Pedido } from './../../model/pedido';
import { Produto } from './../../model/produto';
import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { LoginService } from 'src/app/autenticacao/services/login.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos!: Pedido[];
  colunas = [
    'email',
    'endereco',
    'nomeProduto',
    'preco',
    'quantidade',
    'tipoProduto',
    'status',
    'acao'
  ];
  constructor(private service: PedidosService) { }

  ngOnInit(): void {
    this.service.list().subscribe(data => this.pedidos = data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.pegaPorEmail(filterValue).subscribe(data => this.pedidos = data);
  }

  enviarPedido(pedido: Pedido){
    pedido.status = "enviado";
    this.service.put(pedido,pedido.id).subscribe(data => console.log(data));
  }

  cancelarPedido(pedido: Pedido){
    pedido.status = "cancelado";
    this.service.put(pedido,pedido.id).subscribe(data => console.log(data));
  }

}
