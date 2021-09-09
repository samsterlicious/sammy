import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.scss'],
})
export class BetDetailsComponent implements OnInit {
  url = '';

  constructor(
    private config: ConfigService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.url = `${this.config.getConfig('BASE_URL')}confirmBet/${
      this.data.betId
    }`;
  }

  getLink() {}

  settleBet() {}

  deleteBet() {}
}
