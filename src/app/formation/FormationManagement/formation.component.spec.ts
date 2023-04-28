import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationManagement } from './formation.component';

describe('FormationManagement', () => {
  let component: FormationManagement;
  let fixture: ComponentFixture<FormationManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationManagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
