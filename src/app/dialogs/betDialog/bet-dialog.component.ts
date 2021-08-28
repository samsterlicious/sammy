import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SherdogService } from 'src/services/gamble/sherdog/sherdog.service';

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.css'],
})
export class BetDialogComponent implements OnInit {
  smartContractAddress = '';

  fightEventFormGroup: FormGroup;
  amountFormGroup: FormGroup;
  betEvents$;

  constructor(
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sherdog: SherdogService
  ) {
    this.fightEventFormGroup = this.formBuilder.group({
      event: ['', Validators.required],
    });

    this.amountFormGroup = this.formBuilder.group({
      amount: [0, Validators.required],
    });

    this.betEvents$ = sherdog.events$;
  }

  ngOnInit(): void {
    this.routes.params.subscribe(
      (params) => (this.smartContractAddress = params.smartContractAddress)
    );
  }

  makeBet() {}
}

interface BetEvent {
  name: string;
}
