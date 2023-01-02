import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../model/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly ENDPOINT = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) {

  }

  public list() {
    return this.httpClient.get<Cidade[]>(this.ENDPOINT);
  }

  public search(valor: string) {
    return this.httpClient.get<Cidade[]>(this.ENDPOINT+'/search/'+ valor);
  }


  public save(cidade: Cidade) {
    const obj = {
      id: cidade.id,
      nome: cidade.nome,
      idEstado: cidade.estado.id
    }

    if (cidade.id == null)
      return this.httpClient.post<Cidade>(this.ENDPOINT, obj);
    return this.httpClient.put<Cidade>(this.ENDPOINT +'/'+ cidade.id, obj);
  }

  public delete(cidade: Cidade) {
    return this.httpClient.delete<Cidade>(this.ENDPOINT +'/'+ cidade.id);
  }
}
