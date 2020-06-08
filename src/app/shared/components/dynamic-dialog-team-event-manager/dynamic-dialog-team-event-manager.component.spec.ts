import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamEventManagerComponent } from './dynamic-dialog-team-event-manager.component';

describe('DynamicDialogTeamEventManagerComponent', () => {
  let component: DynamicDialogTeamEventManagerComponent;
  let fixture: ComponentFixture<DynamicDialogTeamEventManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamEventManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamEventManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
