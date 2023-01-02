import { Cidade } from "src/app/cidade/model/cidade";

export interface Usuario {
    //só funcionou assim
    id: string;
    groups : string[];
    nome: string;
    email: string;
    senha: string;
    codArea: string;
    telefone: string;
    cidade: Cidade;
    imageFile: File;
    nomeFile: string;
}


