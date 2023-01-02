import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFracassoComponent } from './tela-fracasso.component';

describe('TelaFracassoComponent', () => {
  let component: TelaFracassoComponent;
  let fixture: ComponentFixture<TelaFracassoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaFracassoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaFracassoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
