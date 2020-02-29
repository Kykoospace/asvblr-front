import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnasiumsComponent } from './gymnasiums.component';

describe('GymnasiumsComponent', () => {
  let component: GymnasiumsComponent;
  let fixture: ComponentFixture<GymnasiumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymnasiumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymnasiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
