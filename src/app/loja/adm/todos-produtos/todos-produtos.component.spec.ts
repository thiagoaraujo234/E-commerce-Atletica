import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProdutosComponent } from './todos-produtos.component';

describe('TodosProdutosComponent', () => {
  let component: TodosProdutosComponent;
  let fixture: ComponentFixture<TodosProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
