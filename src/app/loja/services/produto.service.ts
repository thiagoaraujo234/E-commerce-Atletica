import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoForm } from '../model/produto-form';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly ENDPOINT = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Produto[]>(this.ENDPOINT);
  }

  public pegaUm(id: number) {
    return this.httpClient.get<Produto>(`${this.ENDPOINT}/tipos/${id}`);
  }

  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT+'/download/'+nomeImagem;
  }
  public save(produto: ProdutoForm) {
    const formData = new FormData();
    formData.append('nome', produto.nome);
    formData.append('desconto', String(produto.desconto));
    formData.append('descricao', produto.descricao);
    formData.append('marca', produto.marca);
    formData.append('preco', String(produto.preco));
    formData.append('quantidade',String(produto.quantidade));
    formData.append('link',produto.link);
    formData.append('imagem', produto.imagem);
    return this.httpClient.post(this.ENDPOINT + '/produtos', formData);
  }
  public edit(produto: Produto, id: number) {
    return this.httpClient.put(this.ENDPOINT + `/${id}`, produto);
  }

  pegaPorNome(nome: string) {
    return this.httpClient.get<Produto[]>(this.ENDPOINT + `/search/${nome}`);
  }
}
