import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  currentDate: any;
  currentYear: any;
  currentMonth: any;
  currentMonthName: any;
  lastDateOfCurrentMonth: any;
  lastDayOfCurrentMonth: any;
  lastDateOfLastMonth: any;
  firstDayOfCurrentMonth: any;
  month = [
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
  date: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    this.renderCalendar();
  }

  renderCalendar(): void {
    this.currentMonthName = this.month[this.currentMonth];
    this.firstDayOfCurrentMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    this.lastDateOfCurrentMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    this.lastDayOfCurrentMonth = new Date(
      this.currentYear,
      this.currentMonth,
      this.lastDateOfCurrentMonth
    ).getDay();
    this.lastDateOfLastMonth = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();
    this.date = [];
    for (let i = this.firstDayOfCurrentMonth; i > 0; i--) {
      this.date.push({
        date: this.lastDateOfLastMonth - i + 1,
        status: 'inactive',
        isToday: false,
      });
    }
    for (let i = 1; i <= this.lastDateOfCurrentMonth; i++) {
      let isToday =
        i === this.currentDate.getDate() &&
        this.currentMonth === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
          ? true
          : false;
      this.date.push({ date: i, status: 'active', isToday: isToday });
    }
    for (let i = this.lastDayOfCurrentMonth; i < 6; i++) {
      this.date.push({
        date: i - this.lastDayOfCurrentMonth + 1,
        status: 'inactive',
        isToday: false,
      });
    }
  }

  prevMonth(): void {
    this.currentMonth = this.currentMonth - 1;
    if (this.currentMonth < 0 || this.currentMonth > 11) {
      this.currentDate = new Date(this.currentYear, this.currentMonth);
      this.currentYear = this.currentDate.getFullYear();
      this.currentMonth = this.currentDate.getMonth();
    } else {
      this.currentDate = new Date();
    }
    this.renderCalendar();
  }

  nextMonth(): void {
    this.currentMonth = this.currentMonth + 1;
    if (this.currentMonth < 0 || this.currentMonth > 11) {
      this.currentDate = new Date(this.currentYear, this.currentMonth);
      this.currentYear = this.currentDate.getFullYear();
      this.currentMonth = this.currentDate.getMonth();
    } else {
      this.currentDate = new Date();
    }
    this.renderCalendar();
  }
}
