import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogSelectUsersComponent } from './dynamic-dialog-select-users.component';

describe('DynamicDialogSelectUsersComponent', () => {
  let component: DynamicDialogSelectUsersComponent;
  let fixture: ComponentFixture<DynamicDialogSelectUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogSelectUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogSelectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
