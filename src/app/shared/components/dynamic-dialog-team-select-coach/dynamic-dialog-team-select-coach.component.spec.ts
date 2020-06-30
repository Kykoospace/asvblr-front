import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamSelectCoachComponent } from './dynamic-dialog-team-select-coach.component';

describe('DynamicDialogTeamSelectCoachComponent', () => {
  let component: DynamicDialogTeamSelectCoachComponent;
  let fixture: ComponentFixture<DynamicDialogTeamSelectCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamSelectCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamSelectCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
