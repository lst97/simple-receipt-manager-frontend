import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptTableComponent } from './recipt-table.component';

describe('ReciptTableComponent', () => {
  let component: ReciptTableComponent;
  let fixture: ComponentFixture<ReciptTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
