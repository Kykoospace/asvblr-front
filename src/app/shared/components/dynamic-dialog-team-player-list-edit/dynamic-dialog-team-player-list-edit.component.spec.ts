import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamPlayerListEditComponent } from './dynamic-dialog-team-player-list-edit.component';

describe('DynamicDialogTeamPlayerListEditComponent', () => {
  let component: DynamicDialogTeamPlayerListEditComponent;
  let fixture: ComponentFixture<DynamicDialogTeamPlayerListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamPlayerListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamPlayerListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
