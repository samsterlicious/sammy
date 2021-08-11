import { Component, OnInit } from '@angular/core';
import { GambleService } from 'src/services/gamble/gamble.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css'],
})
export class CasinoComponent implements OnInit {
  constructor(private gambleService: GambleService) {}

  ngOnInit(): void {}

  makeBet() {
    console.log('hi');
    this.gambleService.makeBet().subscribe();
  }
}
