import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptStatisticComponent } from './recipt-statistic.component';

describe('ReciptStatisticComponent', () => {
  let component: ReciptStatisticComponent;
  let fixture: ComponentFixture<ReciptStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
