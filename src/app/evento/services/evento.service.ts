import { Cidade } from './../../cidade/model/cidade';
import { Evento } from './../model/evento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private readonly ENDPOINT = 'http://localhost:8080/eventos';

  constructor(
    private httpClient: HttpClient
  ) {

  }

  public getAll(){
    return this.httpClient.get<Evento[]>(this.ENDPOINT);
  }

  public getListEvento(valor : string){
    return this.httpClient.get<Evento[]>(this.ENDPOINT + "/search/" + valor);
  }

  public getById(valor : number){
    return this.httpClient.get<Evento>(this.ENDPOINT + "/" + valor);
  }

  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT+'/download/'+nomeImagem;
  }

  public save(evento : Evento, listIdEnderecoRemovido : Array<number>){
    // console.log("arroz");
    let obj : {
      nome: string,
      data: Date,
      descricao: string,
      atleticasParticipantes: string[],
      listaIdEnderecoRemovido: number[],
      listaIdEsporte: number[],
      listEndereco: {
        id: number
        cep: string,
        logradouro: string,
        numero: string,
        idCidade: number,
      }[],
      nomeFile: string,
    };

    obj = {
      nome: evento.nome,
      data: evento.data,
      descricao: evento.descricao ,
      atleticasParticipantes : evento.atleticasParticipantes,
      listaIdEnderecoRemovido : listIdEnderecoRemovido,
      listaIdEsporte : [],
      listEndereco : [],
      nomeFile: evento.nomeImagem,
    };

    if (evento.esportes != null){
      evento.esportes.forEach(esporte => {
        obj.listaIdEsporte.push(esporte.id)
      });
    }

    if (evento.endereco != null){
      evento.endereco.forEach(endereco => {
        obj.listEndereco.push(
          {cep : endereco.cep, logradouro : endereco.logradouro, numero : endereco.numero + "", idCidade: endereco.cidade.id, id: endereco.id})
      });
    }

    if (evento.id == null){
      return this.httpClient.post<Evento>(this.ENDPOINT, obj);
    }
    return this.httpClient.put<Evento>(this.ENDPOINT + "/" + evento.id, obj);
  }

  public atualizaImagem(evento : Evento, id: number) {
    const formData = new FormData();
    console.log(evento.imagemFile)
    if (evento.nomeImagem && evento.imagemFile){
      formData.append("id", String(id));
      formData.append("nomeFile", evento.nomeImagem);
      formData.append("imagemFile", evento.imagemFile);


      this.httpClient.put<Evento>(this.ENDPOINT + "/putupload", formData).subscribe((dados) => console.log(dados));
    }
  }

  public delete(evento : Evento){
    return this.httpClient.delete<Evento>(this.ENDPOINT + "/" + evento.id)
  }
}
