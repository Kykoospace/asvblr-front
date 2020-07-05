import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogTeamMatchDetailComponent } from './dynamic-dialog-team-match-detail.component';

describe('DynamicDialogTeamMatchDetailComponent', () => {
  let component: DynamicDialogTeamMatchDetailComponent;
  let fixture: ComponentFixture<DynamicDialogTeamMatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogTeamMatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogTeamMatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
