import { Cidade } from './../../cidade/model/cidade';

export interface Evento {
  id: number,
  nome: string,
  data: Date,
  nomeImagem: string,
  descricao: string,
  atleticasParticipantes: string[],
  esportes: {
    id: number,
    nome : string,
    modalidade : string,
    imagemFile:File,
    nomeImagem:string
  }[],
  endereco: {
    id: number,
    cep: string,
    logradouro: string,
    numero: number,
    cidade: Cidade,
  }[],
  imagemFile: File,
}
