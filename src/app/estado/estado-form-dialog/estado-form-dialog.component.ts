import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estado } from '../model/estado';

@Component({
  selector: 'app-estado-form-dialog',
  templateUrl: './estado-form-dialog.component.html',
  styleUrls: ['./estado-form-dialog.component.css']
})
export class EstadoFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EstadoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estado
  ) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
