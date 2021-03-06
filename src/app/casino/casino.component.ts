import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountInfo, GambleService } from 'src/services/gamble/gamble.service';
import { BetDetailsComponent } from '../dialogs/bet-details/bet-details.component';
import { SmartContractDialogComponent } from '../dialogs/smartContractDialog/smart-contract-dialog.component';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent implements OnInit {
  @Input() smartContractAddress = '';

  displayedColumns: string[] = [
    'event',
    'chosenFighter',
    'amount',
    'cutoffDate',
    'settlementDate',
  ];
  constructor(
    private gambleService: GambleService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.accountInfo$ = this.gambleService.$vm.pipe(
      tap((resp) => {
        this.smartContractAddress = resp.smartContractAddress;
      })
    );
  }

  accountInfo$: Observable<AccountInfo>;

  ngOnInit(): void {}

  makeBet() {
    if (this.smartContractAddress) {
      this.router.navigate([`bet/${this.smartContractAddress}`]);
    } else {
      const dialogRef = this.dialog.open(SmartContractDialogComponent, {
        restoreFocus: false,
      });
    }
  }

  openDialogDetails(betId: string) {
    this.dialog.open(BetDetailsComponent, {
      restoreFocus: false,
      data: {
        betId,
      },
    });
  }
}
