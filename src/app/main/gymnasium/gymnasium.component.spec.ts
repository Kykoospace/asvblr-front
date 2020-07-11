import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnasiumComponent } from './gymnasium.component';

describe('GymnasiumComponent', () => {
  let component: GymnasiumComponent;
  let fixture: ComponentFixture<GymnasiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnasiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnasiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
