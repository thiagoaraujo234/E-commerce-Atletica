import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private readonly ENDPOINT = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) {

  }

  public list() {
    return this.httpClient.get<Estado[]>(this.ENDPOINT);
  }

  public search(valor: string) {
    return this.httpClient.get<Estado[]>(this.ENDPOINT+'/search/'+ valor);
  }

  public save(estado: Estado) {
    if (estado.id == null)
      return this.httpClient.post<Estado>(this.ENDPOINT, estado);
    return this.httpClient.put<Estado>(this.ENDPOINT +'/'+ estado.id, estado);
  }

  public delete(estado: Estado) {
    return this.httpClient.delete<Estado>(this.ENDPOINT +'/'+ estado.id);
  }
}
