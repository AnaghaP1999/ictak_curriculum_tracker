import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrequirementComponent } from './editrequirement.component';

describe('EditrequirementComponent', () => {
  let component: EditrequirementComponent;
  let fixture: ComponentFixture<EditrequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditrequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
