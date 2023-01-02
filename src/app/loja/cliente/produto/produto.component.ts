import { Produto } from '../../model/produto';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Produto = {
    id: 0,
    preco: 0,
    quantidade: 0,
    nome: '',
    descricao: '',
    imagem: '',
    marca: '',
    tipos: [],
    desconto: 0,
    link: ""
  }

  constructor(private router: Router,private sanitizer: DomSanitizer, private service: ProdutoService) { }

  ngOnInit(): void {
    console.log(this.produto)
  }

  adcFavorite(produto: Produto){
    alert(produto.nome+" adicionado aos favoritos");
  }

  adcCarrinho(produto: Produto){
    alert(produto.nome+" adicionado ao carrinho");
  }

  expandir(): void{
    this.router.navigate(['/comprar'], { queryParams: { id: this.produto.id } });
  }
  calculaDesconto(){
    if(this.produto.desconto) return (this.produto.preco - (this.produto.preco/this.produto.desconto)).toFixed(2)
    return this.produto.preco
  }
  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.service.getUrlImagem(nomeImagem));
  }

  temImagem(): boolean {
    if (this.produto.imagem == '' || this.produto.imagem == undefined){
      return false;
    }
    return true;
  }
}
