import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParceirosComponent } from './admin-parceiros.component';

describe('AdminParceirosComponent', () => {
  let component: AdminParceirosComponent;
  let fixture: ComponentFixture<AdminParceirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParceirosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminParceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
