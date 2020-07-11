import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogUsersSelectPresidentComponent } from './dynamic-dialog-users-select-president.component';

describe('DynamicDialogUsersSelectPresidentComponent', () => {
  let component: DynamicDialogUsersSelectPresidentComponent;
  let fixture: ComponentFixture<DynamicDialogUsersSelectPresidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogUsersSelectPresidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogUsersSelectPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
