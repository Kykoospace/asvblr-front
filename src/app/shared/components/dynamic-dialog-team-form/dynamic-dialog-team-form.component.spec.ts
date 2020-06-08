import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamFormComponent } from './dynamic-dialog-team-form.component';

describe('DynamicDialogTeamFormComponent', () => {
  let component: DynamicDialogTeamFormComponent;
  let fixture: ComponentFixture<DynamicDialogTeamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
