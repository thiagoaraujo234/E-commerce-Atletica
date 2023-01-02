import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosRelacionadosComponent } from './produtos-relacionados.component';

describe('ProdutosRelacionadosComponent', () => {
  let component: ProdutosRelacionadosComponent;
  let fixture: ComponentFixture<ProdutosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosRelacionadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
