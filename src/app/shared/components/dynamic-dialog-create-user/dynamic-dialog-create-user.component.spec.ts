import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogCreateUserComponent } from './dynamic-dialog-create-user.component';

describe('DynamicDialogCreateUserComponent', () => {
  let component: DynamicDialogCreateUserComponent;
  let fixture: ComponentFixture<DynamicDialogCreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
