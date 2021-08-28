import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartContractDialogComponent } from './smart-contract-dialog.component';

describe('SmartContractDialogComponent', () => {
  let component: SmartContractDialogComponent;
  let fixture: ComponentFixture<SmartContractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartContractDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
