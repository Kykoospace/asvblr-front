import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogPreviewDocumentComponent } from './dynamic-dialog-preview-document.component';

describe('DynamicDialogPreviewDocumentComponent', () => {
  let component: DynamicDialogPreviewDocumentComponent;
  let fixture: ComponentFixture<DynamicDialogPreviewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDialogPreviewDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDialogPreviewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
