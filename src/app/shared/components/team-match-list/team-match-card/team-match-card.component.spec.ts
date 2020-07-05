import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMatchCardComponent } from './team-match-card.component';

describe('TeamMatchCardComponent', () => {
  let component: TeamMatchCardComponent;
  let fixture: ComponentFixture<TeamMatchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMatchCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMatchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
