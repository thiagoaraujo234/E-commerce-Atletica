import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private estadoService: EstadoService,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      nome: null,
      sigla: null
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    console.log(this.form.value);
    this.estadoService.save(this.form.value).subscribe(estado => console.log(estado));
  }

  onCancel() {

  }

}
