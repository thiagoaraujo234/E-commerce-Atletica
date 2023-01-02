import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Esporte } from '../model/esporte';

@Injectable({
  providedIn: 'root'
})
export class EsporteService {


  private readonly ENDPOINT = 'http://localhost:8080/esportes';

  constructor(private httpClient: HttpClient) {

  }

  public list() {
    return this.httpClient.get<Esporte[]>(this.ENDPOINT);
  }

  public save(esporte: Esporte) {
    const formData = new FormData();
    formData.append('nome', esporte.nome);
    formData.append('modalidade', esporte.modalidade);

    formData.append('imagem', esporte.imagemFile);
    formData.append('nomeImagem', esporte.nomeImagem);

      return this.httpClient.post(this.ENDPOINT+'/postUpload', formData);
  }


  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT+'/download/'+nomeImagem;
  }


  public update(esporte: Esporte){

    const formData = new FormData();

    formData.append('id', String(esporte.id));
    formData.append('nome', esporte.nome);
    formData.append('modalidade', esporte.modalidade);

    formData.append('imagem', esporte.imagemFile);
    formData.append('nomeImagem', esporte.nomeImagem);

      return this.httpClient.put<Esporte>(this.ENDPOINT+'/putUpload', formData);

  }

  public delete(esporte: Esporte) {
    return this.httpClient.delete<Esporte>(this.ENDPOINT +'/'+ esporte.id);
  }
  
}
