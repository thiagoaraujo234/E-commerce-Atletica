import { Tipo } from "./tipo"

export interface Produto {
  id: number
  preco: number
  desconto: number
  quantidade: number
  nome: string
  descricao: string
  imagem: string
  marca: string
  tipos: Tipo[]
  link: string
}
