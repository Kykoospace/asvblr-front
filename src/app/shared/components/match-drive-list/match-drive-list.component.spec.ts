import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDriveListComponent } from './match-drive-list.component';

describe('MatchDriveListComponent', () => {
  let component: MatchDriveListComponent;
  let fixture: ComponentFixture<MatchDriveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDriveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDriveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
