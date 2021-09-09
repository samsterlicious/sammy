import { Component, OnInit } from '@angular/core';
import { GambleService } from 'src/services/gamble/gamble.service';

@Component({
  selector: 'app-smart-contract-dialog',
  templateUrl: './smart-contract-dialog.component.html',
  styleUrls: ['./smart-contract-dialog.component.scss'],
})
export class SmartContractDialogComponent implements OnInit {
  constructor(private gambleService: GambleService) {}

  ngOnInit(): void {}

  createContract() {
    this.gambleService.createNewContract();
  }
}
