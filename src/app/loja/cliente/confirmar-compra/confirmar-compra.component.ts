import { Produto } from './../../model/produto';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from '../../model/pedido';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css'],
})
export class ConfirmarCompraComponent implements OnInit {
  produto!: Produto;
  pedido!: Pedido;
  email: string = '';
  endereco: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Produto, private service: PedidosService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.produto = this.data;
  }

  pegaEndereco(evento: Event) {
    this.endereco = (evento.target as HTMLInputElement).value;
  }

  pegaEmail(evento: Event) {
    this.email = (evento.target as HTMLInputElement).value;
  }

  enviaCompra(){
    this.pedido = {
      id: 0,
      endereco: this.endereco,
      email: this.email,
      status: "pendente",
      nomeProduto: this.produto.nome,
      preco: this.produto.preco,
      tipoProduto: "",
      quantidade: 1
    }
    if(this.email != "" && this.endereco != ''){
    this.service.post(this.pedido).subscribe(data =>{console.log(data);});
    console.log(this.produto);
    window.location.href = this.produto.link;
    }
  }

}
