import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parceiro } from '../model/parceiro';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  private readonly ENDPOINT = 'http://localhost:8080/parceiros';

  constructor(private httpClient: HttpClient) {

  }

  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT+'/download/'+nomeImagem;
  }
  public list() {
    return this.httpClient.get<Parceiro[]>(this.ENDPOINT);
  }



  public save(parceiro: Parceiro) {
    const formData = new FormData();
    formData.append('nome', parceiro.nome);
    formData.append('descricao', parceiro.descricao);

    formData.append('imagem', parceiro.imageFile);
    formData.append('nomeImagem', parceiro.nomeFile);

    return this.httpClient.post(this.ENDPOINT+'/postupload', formData);
    }

    public edit(parceiro: Parceiro) {
      const formData = new FormData();
      formData.append('id', parceiro.id);
      formData.append('nome', parceiro.nome);
      formData.append('descricao', parceiro.descricao);

      formData.append('imagem', parceiro.imageFile);
      formData.append('nomeImagem', parceiro.nomeFile);

      return this.httpClient.put<Parceiro>(this.ENDPOINT+'/putupload', formData);
    }

  public delete(parceiro: Parceiro) {
    return this.httpClient.delete<Parceiro>(this.ENDPOINT +'/'+ parceiro.id);
  }


}
