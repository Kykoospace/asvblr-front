import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMatchListComponent } from './team-match-list.component';

describe('TeamMatchListComponent', () => {
  let component: TeamMatchListComponent;
  let fixture: ComponentFixture<TeamMatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
