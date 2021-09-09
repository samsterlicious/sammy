import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  FullBetDetails,
  GambleService,
} from 'src/services/gamble/gamble.service';

@Component({
  selector: 'app-confirm-bet',
  templateUrl: './confirm-bet.component.html',
  styleUrls: ['./confirm-bet.component.scss'],
})
export class ConfirmBetComponent implements OnInit {
  betId = '';
  bet$ = new Observable<FullBetDetails>();
  contractAdress = '';
  amount = 0;
  submitted = false;
  key = '';

  constructor(
    private _api: GambleService,
    private _routes: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this._routes.params.subscribe((params) => {
      this.betId = params.betId;
      this.bet$ = this._api.getBetInfo(this.betId).pipe(
        tap((resp) => {
          this.contractAdress = resp.smartContractAddress;
          this.amount = resp.amount;
          this.key = resp.sort_key.replace(/bet~/, '');
        })
      );
    });
  }

  ngOnInit(): void {}

  makeBet() {
    this.submitted = true;
    this._api
      .confirmBet(this.key, this.contractAdress, this.amount)
      .pipe(
        catchError((error) => {
          this._snackBar.open(error, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
          return of(false);
        })
      )
      .subscribe();
  }
}
