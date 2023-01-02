import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cidade } from '../model/cidade';
import { CidadeService } from '../services/cidade.service';

@Component({
  selector: 'app-consulta-cidade-dialog',
  templateUrl: './consulta-cidade-dialog.component.html',
  styleUrls: ['./consulta-cidade-dialog.component.css']
})
export class ConsultaCidadeDialogComponent implements OnInit {
  valor = '';
  cidades: Observable<Cidade[]>;
  displayedColumns = ['nome', 'sigla', 'acao']

  constructor(
    private ciadadeService: CidadeService,
    public dialogRef: MatDialogRef<ConsultaCidadeDialogComponent>) {
      this.cidades = new Observable<Cidade[]>();

  }

  ngOnInit(): void {
  }

  onFind() {
    console.log('valor' + this.valor.length);

    if (typeof this.valor === "string" && this.valor.trim().length == 0) {
      this.cidades =  this.ciadadeService.list();
    } else {
      this.cidades = this.ciadadeService.search(this.valor);
    }
  }

  onSelect(cidade: Cidade) {
    this.dialogRef.close(cidade);
  }

}
