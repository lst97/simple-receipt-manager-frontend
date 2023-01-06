import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEditDialogContentComponent } from './record-edit-dialog-content.component';

describe('RecordEditDialogContentComponent', () => {
  let component: RecordEditDialogContentComponent;
  let fixture: ComponentFixture<RecordEditDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordEditDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordEditDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
