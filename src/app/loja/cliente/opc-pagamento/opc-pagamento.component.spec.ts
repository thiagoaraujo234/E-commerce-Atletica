import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcPagamentoComponent } from './opc-pagamento.component';

describe('OpcPagamentoComponent', () => {
  let component: OpcPagamentoComponent;
  let fixture: ComponentFixture<OpcPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
