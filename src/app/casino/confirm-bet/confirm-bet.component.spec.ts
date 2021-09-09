import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBetComponent } from './confirm-bet.component';

describe('ConfirmBetComponent', () => {
  let component: ConfirmBetComponent;
  let fixture: ComponentFixture<ConfirmBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
