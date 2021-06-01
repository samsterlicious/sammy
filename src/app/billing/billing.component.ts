import { Component, OnInit } from '@angular/core';
import { BillingService, Budget } from '../../services/billing/billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  constructor(private billingService: BillingService) {
    this.years = Object.keys(this.bucketStructure);
    this.months = this.bucketStructure[this.years.slice(-1)[0]];

    this.selectedYear = this.years.slice(-1)[0];
    this.selectedMonth = this.months.slice(-1)[0];
  }

  selectedYear: string;
  selectedMonth: string;

  chartUrl = "";

  months: string[] = [];
  years: string[] = [];

  bucketStructure: Structure = {
    '2020': ['December'],
    '2021': ['March', 'April'],
  };

  ngOnInit(): void {}

  loadMonths(selectedYear: string) {
    this.months = this.bucketStructure[selectedYear];
  }

  loadChart(selectedMonth: string) {
    this.billingService.getBudget(this.selectedYear, selectedMonth).subscribe(resp=>{
      this.chartUrl = resp.url
    });
  }
}

interface Structure {
  [key: string]: string[];
}
