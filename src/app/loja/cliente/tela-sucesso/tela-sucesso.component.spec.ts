import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSucessoComponent } from './tela-sucesso.component';

describe('TelaSucessoComponent', () => {
  let component: TelaSucessoComponent;
  let fixture: ComponentFixture<TelaSucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaSucessoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
