import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Estado } from 'src/app/estado/model/estado';
import { EstadoService } from 'src/app/estado/services/estado.service';
import { Cidade } from '../model/cidade';

@Component({
  selector: 'app-cidade-form-dialog',
  templateUrl: './cidade-form-dialog.component.html',
  styleUrls: ['./cidade-form-dialog.component.css']
})

export class CidadeFormDialogComponent implements OnInit {
  estados: Observable<Estado[]>;

  constructor(
    private estadoService: EstadoService,
    public dialogRef: MatDialogRef<CidadeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cidade) {

    this.estados = estadoService.list();
  }

  ngOnInit() {

  }

  displayFn(estado: Estado): string {
    return estado && estado.nome ? estado.nome : '';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onFilter(event: Event) {
    this.estados = this.estadoService.search(String(event));
  }

}
