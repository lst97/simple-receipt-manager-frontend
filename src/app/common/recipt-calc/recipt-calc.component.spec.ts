import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptCalcComponent } from './recipt-calc.component';

describe('ReciptCalcComponent', () => {
  let component: ReciptCalcComponent;
  let fixture: ComponentFixture<ReciptCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptCalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
