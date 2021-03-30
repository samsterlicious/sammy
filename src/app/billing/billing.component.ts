import { Component, OnInit } from '@angular/core';
import { BillingService, Budget } from '../../services/billing/billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getBudget().subscribe(resp=>{
      console.log(resp)
    })
  }

}
