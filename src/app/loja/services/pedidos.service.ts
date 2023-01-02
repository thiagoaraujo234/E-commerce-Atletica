import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private readonly ENDPOINT = 'http://localhost:8080/pedidos';

  constructor(private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Pedido[]>(this.ENDPOINT);
  }

  public post(pedido: Pedido) {
    return this.httpClient.post<Pedido>(this.ENDPOINT,pedido);
  }

  public put(pedido: Pedido, id: number) {
    return this.httpClient.put<Pedido>(this.ENDPOINT+ `/${id}`,pedido);
  }

  pegaPorEmail(email: string) {
    return this.httpClient.get<Pedido[]>(this.ENDPOINT+`/search/${email}`);
  }
}
