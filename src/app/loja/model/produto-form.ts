import { Tipo } from "./tipo";

export interface ProdutoForm {
  preco: number;
  desconto: number;
  quantidade: number;
  nome: string;
  descricao: string;
  imagem: File;
  marca: string;
  link: string;
}
