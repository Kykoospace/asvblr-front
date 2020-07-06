import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDriveCardComponent } from './match-drive-card.component';

describe('MatchDriveCardComponent', () => {
  let component: MatchDriveCardComponent;
  let fixture: ComponentFixture<MatchDriveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDriveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDriveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
