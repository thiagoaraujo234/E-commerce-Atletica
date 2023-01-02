import { Cidade } from './../../cidade/model/cidade';
import { CidadeService } from './../../cidade/services/cidade.service';
import { Esporte } from './../../esporte/model/esporte';
import { EventoService } from './../services/evento.service';
import { Evento } from './../model/evento';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaCidadeDialogComponent } from 'src/app/cidade/consulta-cidade-dialog/consulta-cidade-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { EsporteService } from 'src/app/esporte/services/esporte.service';

@Component({
  selector: 'app-evento-form-dialog',
  templateUrl: './evento-form-dialog.component.html',
  styleUrls: ['./evento-form-dialog.component.css']
})
export class EventoFormDialogComponent implements OnInit {
  formEvento!: FormGroup;
  formEndereco!: FormGroup;
  listIdEnderecoRemovido!: number[];
  novaAtletica!: string;
  novoEsporte!: Esporte;
  cidades!: Cidade[];
  preview!: string;
  imagemFile!: File;

  endereco = {
    id: 0,
    cep: "",
    logradouro: "",
    numero: 0,
    cidade: {
      id: 0,
      nome: "",
      estado: {
        id: 0,
        nome: "",
        sigla: ""
      }
    },
  };

  //adicionando os atributos imagemFile e nomeImagem para não dar erro
  esportes!: Esporte[];
  //  = [
  //   { id: 1, nome: 'Futebol', modalidade: 'com os pés',imagemFile:this.imagemFile,nomeImagem:'Tete' },
  //   { id: 2, nome: 'Volei', modalidade: 'com as mãos',imagemFile:this.imagemFile,nomeImagem:'Teste' },
  // ];

  panelOpenStateAtletica = false;
  panelOpenStateEsporte = false;
  panelOpenStateEndereco = false;

  constructor(
    public dialogRef: MatDialogRef<EventoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento,
    private dialog: MatDialog,
    private eventoService: EventoService,
    private cidadeService: CidadeService,
    private esporteService: EsporteService,
    private sanitizer: DomSanitizer,
  ) {
    this.refreshData();
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(evento: Evento) {
    let formEsportes = Array<FormGroup>();
    let formEndereco = Array<FormGroup>();
    let formAtletica = Array<FormControl>();

    if (evento.esportes != null) {
      evento.esportes.forEach(e => {
        formEsportes.push(new FormGroup({
          nome: new FormControl(e.nome),
          id: new FormControl(e.id),
          modalidade: new FormControl(e.modalidade),
          imagemFile: new FormControl(e.imagemFile),
          nomeImagem:new FormControl(e.nomeImagem)
        }));
      });
    }

    if (evento.endereco != null) {
      evento.endereco.forEach(e => {
        formEndereco.push(new FormGroup({
          id: new FormControl(e.id),
          cep: new FormControl(e.cep),
          logradouro: new FormControl(e.logradouro),
          numero: new FormControl(e.numero),
          cidade: new FormGroup({
            id: new FormControl(e.cidade.id),
            nome: new FormControl(e.cidade.nome),
            estado: new FormGroup({
              id: new FormControl(e.cidade.estado.id),
              nome: new FormControl(e.cidade.estado.nome),
              sigla: new FormControl(e.cidade.estado.sigla)
            })
          })
        }));
      });
    }

    this.carregaFormEndereco();

    if (!!evento.atleticasParticipantes) {
      evento.atleticasParticipantes.forEach(a => formAtletica.push(new FormControl(a)));
    }

    this.formEvento = new FormGroup({
      id: new FormControl(evento.id),
      nome: new FormControl(evento.nome, [Validators.required, Validators.minLength(2)]),
      data: new FormControl(evento.data, [Validators.required]),
      descricao: new FormControl((evento.descricao == null)? "" : evento.descricao, [Validators.maxLength(255)]),
      atleticasParticipantes: new FormArray(formAtletica),
      esportes: new FormArray(formEsportes),
      endereco: new FormArray(formEndereco),
      imagemFile: new FormControl(),
      nomeImagem: new FormControl()
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.formEvento.invalid) {
      return;
    }

    const evento = this.formEvento.value;
    if (evento.imagemFile != null){
      evento.imagemFile = this.imagemFile;
      evento.nomeImagem = this.imagemFile.name;
    } else {
      evento.nomeImagem = this.data.nomeImagem;
    }

    return this.dialogRef.close({ evento: evento, lista: this.listIdEnderecoRemovido });
  }

  handleFile(target : any) {
    if (target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      let files = element.files;
      if (files) {
        this.imagemFile = files[0];
      }
    }
    // gerando o preview da imagem
    const reader = new FileReader();
    // convertendo em base 64
    reader.onload = (event:any) => this.preview = event.target.result;
    reader.readAsDataURL(this.imagemFile);
  }

  // Formulario de evento
  get nome() {
    return this.formEvento.get("nome")!;
  }
  get dataEvento() {
    return this.formEvento.get("data")!;
  }
  get descricao() {
    return this.formEvento.get("descricao")!;
  }

  // Formulario de endereço
  get enderecoCep() {
    return this.formEndereco.get("cep")!;
  }

  get enderecoLogradouro() {
    return this.formEndereco.get("logradouro")!;
  }

  get enderecoNumero() {
    return this.formEndereco.get("numero")!;
  }

  get enderecoCidade() {
    return this.formEndereco.get("cidade")!;
  }

  get enderecoCidadeNome() {
    return this.formEndereco.get("cidade")?.get("nome")!;
  }
  // get nome() {
  //   return this.formEvento.get("nome");
  // }

  refreshData(): void {
    if (this.data.id)
      this.eventoService.getById(this.data.id).subscribe((dados) => this.data = dados);
    this.cidadeService.list().subscribe((dados) => this.cidades = dados);
    this.esporteService.list().subscribe((dados) => this.esportes = dados);
  }

  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.eventoService.getUrlImagem(nomeImagem));
  }

  openAtletica(): void {
    this.panelOpenStateAtletica = true;
    this.panelOpenStateEsporte = false;
    this.panelOpenStateEndereco = false;
  }

  removeAtletica(atletica: string): void {
    let index = this.data.atleticasParticipantes.indexOf(atletica);
    let formIndex = (this.formEvento.controls["atleticasParticipantes"] as FormArray)
      .value.indexOf(atletica);

    (this.formEvento.controls["atleticasParticipantes"] as FormArray)
      .removeAt(formIndex);
    this.data.atleticasParticipantes.splice(index, 1);
  }

  adcionaAtletica(): void {
    if (this.data.atleticasParticipantes == null)
      this.data.atleticasParticipantes = [];

    if (!!this.novaAtletica) {
      let index = this.data.atleticasParticipantes.indexOf(this.novaAtletica);
      if (!isNaN(index)) {
        this.data.atleticasParticipantes.push(this.novaAtletica);
        (this.formEvento.controls["atleticasParticipantes"] as FormArray)
          .push(new FormControl(this.novaAtletica));
      }
    }
    this.novaAtletica = "";
  }

  openEsporte(): void {
    this.panelOpenStateAtletica = false;
    this.panelOpenStateEsporte = true;
    this.panelOpenStateEndereco = false;
  }

  removeEsporte(esporte: Esporte): void {
    // let formEsportes = Array<FormGroup>();
    let index = this.data.esportes.indexOf(esporte);
    let formIndex = (this.formEvento.controls["esportes"] as FormArray)
      .value.indexOf(esporte);

    (this.formEvento.controls["esportes"] as FormArray).removeAt(index);
    this.data.esportes.splice(index, 1);
  }

  adcionaEsporte(): void {

    if (this.data.esportes == null) {
      this.data.esportes = [];
    }
    if (this.novoEsporte != null) {
      let index = this.data.esportes.indexOf(this.novoEsporte);
      if (!isNaN(index)) {
        this.data.esportes.push(this.novoEsporte);
        (this.formEvento.controls["esportes"] as FormArray).push(new FormGroup({
          id: new FormControl(this.novoEsporte.id),
          nome: new FormControl(this.novoEsporte.nome),
          modalidade: new FormControl(this.novoEsporte.modalidade)
        }));
      }
    }
    // this.novoEsporte = undefined;
  }

  openEndereco(): void {
    this.panelOpenStateAtletica = false;
    this.panelOpenStateEsporte = false;
    this.panelOpenStateEndereco = true;
  }

  editEndereco(): void {
    this.endereco = JSON.parse(JSON.stringify(this.endereco));
    this.carregaFormEndereco();
    this.openEndereco();
  }

  removeEndereco(): void {
    for (let i = 0; i < this.formEvento.controls["endereco"].value.length; i++) {
      if (this.formEvento.controls["endereco"].value[i].cep == this.endereco.cep &&
        this.formEvento.controls["endereco"].value[i].logradouro == this.endereco.logradouro &&
        this.formEvento.controls["endereco"].value[i].numero == this.endereco.numero) {

        if (this.formEvento.controls["endereco"].value[i].id != null) {
          if (this.listIdEnderecoRemovido == null)
            this.listIdEnderecoRemovido = Array<number>();

          this.listIdEnderecoRemovido.push(this.formEvento.controls["endereco"].value[i].id);
        }

        this.data.endereco.splice(i, 1);
        (this.formEvento.controls["endereco"] as FormArray).removeAt(i);
      }
    }

    this.resetEndereco();
  }

  carregaFormEndereco(): void {
    this.formEndereco = new FormGroup({
      id: new FormControl(this.endereco.id),
      cep: new FormControl(this.endereco.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      logradouro: new FormControl(this.endereco.logradouro, [Validators.required]),
      numero: new FormControl(this.endereco.numero, [Validators.required, Validators.min(1)]),
      cidade: new FormGroup({
        id: new FormControl(this.endereco.cidade.id),
        nome: new FormControl(this.endereco.cidade.nome, [Validators.required]),
        estado: new FormGroup({
          id: new FormControl(this.endereco.cidade.estado.id),
          nome: new FormControl(this.endereco.cidade.estado.nome),
          sigla: new FormControl(this.endereco.cidade.estado.sigla)
        })
      }, [Validators.required])
    });
  }

  openConsultaCidadeDialog() : void {
    const dialogRef = this.dialog.open(ConsultaCidadeDialogComponent, {
      width: '450px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      // atualizando a cidade do formgroup
      this.formEndereco.patchValue({
        cidade:result
      })
    });
  } 

  resetEndereco(): void {
    this.panelOpenStateEndereco = false;

    this.endereco = {
      id: 0,
      cep: "",
      logradouro: "",
      numero: 0,
      cidade: {
        id: 0,
        nome: "",
        estado: {
          id: 0,
          nome: "",
          sigla: ""
        }
      },
    };

    this.cidadeService.list().subscribe((dados) => this.cidades = dados);
    this.carregaFormEndereco();
  }

  salvarEndereco(): void {
    if (this.data.endereco == null) {
      this.data.endereco = [];
    } else if (this.endereco.id >= 1) {
      for (let i = 0; i < this.formEvento.controls["endereco"].value.length; i++) {
        if (this.formEvento.controls["endereco"].value[i].id == this.endereco.id) {
          this.data.endereco.splice(i, 1);
          (this.formEvento.controls["endereco"] as FormArray).removeAt(i);
        }
      }
    }

    (this.formEvento.controls["endereco"] as FormArray).push(this.formEndereco);
    this.data.endereco.push(this.formEndereco.value);

    this.carregaFormEndereco();
    this.resetEndereco();
  }
}
