import { Estado } from "src/app/estado/model/estado";

export interface Cidade {
  id: number;
  nome: string;
  estado: Estado
}
