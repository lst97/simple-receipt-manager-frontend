import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptRecordEditDialogComponent } from './recipt-record-edit-dialog.component';

describe('ReciptRecordEditDialogComponent', () => {
  let component: ReciptRecordEditDialogComponent;
  let fixture: ComponentFixture<ReciptRecordEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptRecordEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptRecordEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
