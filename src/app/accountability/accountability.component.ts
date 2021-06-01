import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.css'],
})
export class AccountabilityComponent implements OnInit {
  selectedYear: string = '';
  selectedMonth: number = 0;
  years: string[] = [];
  months: string[] = [];

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  daysArray: Day[] = [];

  constructor() {
    const yearNum = 5;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    for (let i = 0; i < yearNum; i++) {
      this.years.push(String(currentYear - i));
    }
    this.selectedYear = String(currentYear);
    this.selectedMonth = currentMonth;

    for (let i = 0; i <= currentDate.getMonth(); i++) {
      this.months.push(this.monthNames[i]);
    } 

    this.getWeeks(currentMonth);
  }

  getWeeks(month: number) {
    let currentDay = new Date(parseInt(this.selectedYear), month, 1);
    const maxDays = new Date(parseInt(this.selectedYear), month+1, 0).getDate(); 
    let dayArray: Day[] = [];
    let count = 0;
    const dayOffset = currentDay.getDay(); 
    console.log('off',dayOffset,'max',maxDays)
    while (count < dayOffset) {
      dayArray.push({
        exist: false,
        name: '',
      })
      count++;
    }
    count = 0;
    while (count < maxDays) {
      dayArray.push({
        exist: true,
        name: this.days[new Date(parseInt(this.selectedYear), this.selectedMonth, ++count).getDay()]
      });
    }
    count= count + dayOffset;
    console.log('count',count)
    while(count % 7 !== 0) {
      dayArray.push({
        exist: false,
        name: ''
      })
      console.log('push')
      count++;
    }
    this.daysArray = dayArray;
  }

  fetch() {
    console.log('month',this.selectedMonth)
    this.getWeeks(this.selectedMonth)
  }

  loadMonths() {
    this.getWeeks(this.selectedMonth)
  }

  ngOnInit(): void {}
}

interface Week {
  days: Day[];
}

interface Day {
  exist: boolean;
  name: string;
}
