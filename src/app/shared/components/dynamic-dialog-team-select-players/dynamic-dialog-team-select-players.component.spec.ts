import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamSelectPlayersComponent } from './dynamic-dialog-team-select-players.component';

describe('DynamicDialogTeamSelectPlayersComponent', () => {
  let component: DynamicDialogTeamSelectPlayersComponent;
  let fixture: ComponentFixture<DynamicDialogTeamSelectPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamSelectPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamSelectPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
