import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BetDetails, GambleService } from 'src/services/gamble/gamble.service';
import {
  BetEvent,
  Fights,
  SherdogService,
} from 'src/services/gamble/sherdog/sherdog.service';

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetDialogComponent implements OnInit {
  smartContractAddress = '';

  fightEventFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  amountFormGroup: FormGroup;

  betEvents$;
  fights$: Observable<Fights[]>;
  displayedColumns: string[] = ['firstFighter', 'secondFighter'];
  loadingFights = false;
  chosenFighter = '';
  generalDate = new Date();
  confirmDetails: BetDetails;
  exchangeRate$: Observable<string>;
  exchangeRate = 0;

  constructor(
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sherdog: SherdogService,
    private gambleService: GambleService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    const eventFormControl = new FormControl('', Validators.required);

    eventFormControl.valueChanges.subscribe((val: BetEvent) => {
      this.loadingFights = true;
      this.confirmDetails.event = val.name;
      this.generalDate = new Date(val.date);
      sherdog.eventSelectedAction(val.link);
      this.confirmDetails.chosenFighter = '';
      console.log(typeof val.date);
      this.dateFormGroup.get('betByDate')?.setValue(this.generalDate);
      this.dateFormGroup.get('settlementDate')?.setValue(this.generalDate);
    });

    this.fightEventFormGroup = this.formBuilder.group({
      event: eventFormControl,
    });

    const amountFormControl = new FormControl(0, Validators.required);
    amountFormControl.valueChanges.subscribe((val: number) => {
      this.confirmDetails.amount = val / this.exchangeRate;
    });

    this.amountFormGroup = this.formBuilder.group({
      amount: amountFormControl,
    });

    const betByDate = new FormControl(new Date(), Validators.required);
    const settlementDate = new FormControl(new Date(), Validators.required);

    betByDate.valueChanges.subscribe((val: Date) => {
      this.confirmDetails.cutoffDate = val;
    });

    settlementDate.valueChanges.subscribe((val: Date) => {
      this.confirmDetails.settlementDate = val;
    });

    this.dateFormGroup = this.formBuilder.group({
      betByDate,
      settlementDate,
    });

    this.betEvents$ = sherdog.events$;
    this.fights$ = sherdog.fights$.pipe(
      tap(() => {
        this.loadingFights = false;
      })
    );

    this.confirmDetails = {
      sport: 'mma',
      event: '',
      chosenFighter: '',
      nonChosenFighter: '',
      cutoffDate: new Date(),
      settlementDate: new Date(),
      amount: 0,
    };

    this.exchangeRate$ = gambleService.exchangeRate$.pipe(
      tap((rate) => {
        this.exchangeRate = parseFloat(rate);
      })
    );
  }

  ngOnInit(): void {
    this.gambleService.getExchangeRate().subscribe();
    this.routes.params.subscribe((params) => {
      this.smartContractAddress = params.smartContract;
    });
  }

  makeBet() {
    console.log(this.confirmDetails);
    this.gambleService
      .makeBet(this.confirmDetails, this.smartContractAddress)
      .subscribe((resp) => {
        this._snackBar.open('Bet successful', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.router.navigate([`casino`]);
      });
  }

  selectFighter(fighter: string, otherFighter: string) {
    this.confirmDetails.chosenFighter = fighter;
    this.confirmDetails.nonChosenFighter = otherFighter;
  }
}
