import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/autenticacao/services/token.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly ENDPOINT = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {

  }

  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT + '/download/' + nomeImagem;
  }
  public list() {
    return this.httpClient.get<Usuario[]>(this.ENDPOINT);
  }

  public save(usuario: Usuario) {
    const formData = new FormData();
    formData.append('nome', usuario.nome);
    formData.append('email', usuario.email);
    formData.append('senha', usuario.senha);
    formData.append('codArea', usuario.codArea);
    formData.append('telefone', usuario.telefone);
    formData.append('idCidade', String(usuario.cidade.id));

    formData.append('imagem', usuario.imageFile);
    formData.append('nomeImagem', usuario.nomeFile);

    return this.httpClient.post(this.ENDPOINT + '/postupload', formData);
  }

  public edit(usuario: Usuario) {
    const formData = new FormData();
    formData.append('id', usuario.id);
    formData.append('nome', usuario.nome);
    formData.append('email', usuario.email);
    formData.append('senha', usuario.senha);
    formData.append('codArea', usuario.codArea);
    formData.append('telefone', usuario.telefone);
    formData.append('imagem', usuario.imageFile);
    formData.append('nomeImagem', usuario.nomeFile);
    formData.append('idCidade', String(usuario.cidade.id));

    return this.httpClient.put<Usuario>(this.ENDPOINT + "/putupload", formData);
  }
  /* 
        formData.append('imagem', usuario.imageFile);
        formData.append('nomeImagem', usuario.nomeFile);
  
        return this.httpClient.put<Usuario>(this.ENDPOINT+'/putupload', formData);
      }
   */
  // public atualizaImagem(usuario: Usuario, id: number) {
  //   const formData = new FormData();
  //   formData.append("id", String(id));
  //   formData.append("nomeFile", usuario.nomeFile);
  //   formData.append("imagemFile", usuario.imageFile);
  //   console.log(formData);

  //   this.httpClient.put<Usuario>(this.ENDPOINT + "/putupload", formData);
  // }


  public delete(usuario: Usuario) {
    return this.httpClient.delete<Usuario>(this.ENDPOINT + '/' + usuario.id);
  }

  // public saveAntigo(usuario: Usuario) {
  //   const obj = {
  //     id: usuario.id,
  //     nome: usuario.nome,
  //     email: usuario.email,
  //     senha: usuario.senha,
  //     telefone: usuario.telefone,
  //     idCidade: usuario.cidade.id
  //   }
  // }

}
