import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'ngds-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['../../../../../../../assets/styles/styles.scss']
})
export class NgdsCalendar implements OnInit {

  // INPUTS

  // Whether or not the datepicker will be used to pick a single date or a range of values.
  @Input() dateRange: boolean = false;

  // A function that returns a boolean when provided a DateTime. DateTimes that return true are disabled in the calendar.
  @Input() disabledDatesFn;

  // The current precision of the datepicker.
  @Input() displayDepth: number = 0; // date, 1 = month, 2 = year 

  // The precision of the datepicker. By default (0), dates can be picked.
  // If minDisplayDepth is 1 or 2, only months or years will be displayed and enabled, respectively.
  // When picking months or years, the datepicker will return the luxon startOf('term'), where 
  // 'term' is months or years, respectively.  
  @Input() minDisplayDepth: number = 0; // date, 1 = month, 2 = year

  // The configuration object that drives the calendar render.
  @Input() calendarConfig;

  // The currently selected start date (or just selected date if datepicker).
  @Input() selectedDate: DateTime;

  // The currently selected end date (rangepicker only).
  @Input() selectedEndDate: DateTime;

  // The date that the user is hovering over.
  @Input() hoverDate: DateTime;

  // Whether or not the datepicker is disabled.
  @Input() disabled: boolean = false;

  // Whether or not to allow rangepickers to have disabled dates within the ranges they select.
  @Input() allowDisabledInRange: boolean = false;

  // OUTPUTS:
  // Emits when the selected date is changed.
  @Output() changeDate = new EventEmitter;

  // Emits when the calendar arrows increment the calendar by month, year, or duodecennial.
  @Output() changeDisplay = new EventEmitter;

  // Emits when the selected month is changed.
  @Output() changeMonth = new EventEmitter;

  // Emits when the selected year is changed.
  @Output() changeYear = new EventEmitter;

  // Emits when the precision of the calendar display is changed. 
  @Output() changeDepth = new EventEmitter;

  // Emits when the current hover date changes.
  @Output() changeHoverDate = new EventEmitter;

  // Emits when the selected dates should be cleared from the calendar.
  @Output() clearDates = new EventEmitter;

  // Note: luxon weekdays are 1-indexed starting on Monday - be careful here
  protected weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Months in a 3x4 grid
  protected months = [
    [
      {
        name: 'January',
        number: 1
      },
      {
        name: 'February',
        number: 2
      },
      {
        name: 'March',
        number: 3
      }
    ],
    [
      {
        name: 'April',
        number: 4
      },
      {
        name: 'May',
        number: 5
      },
      {
        name: 'June',
        number: 6
      }
    ],
    [
      {
        name: 'July',
        number: 7
      },
      {
        name: 'August',
        number: 8
      },
      {
        name: 'September',
        number: 9
      }
    ],
    [
      {
        name: 'October',
        number: 10
      },
      {
        name: 'November',
        number: 11
      },
      {
        name: 'December',
        number: 12
      }
    ],
  ]

  ngOnInit(): void {
    // set display to the minimum display depth.
    this.displayDepth = this.minDisplayDepth;
  }

  /**
   * Checks to see if two DateTimes have the same day/month/year.
   * Must return true if date1 = date2 = null.
   * This function is called extremely often; keep it concise.
   * @param date1 `luxon` DateTime
   * @param date2 `luxon` DateTime
   * @returns boolean - `true` if the dates match. 
   */
  checkDateMatch(date1, date2): boolean {
    if (date1?.toISODate() !== date2?.toISODate()) {
      return false;
    }
    return true;
  }

  /**
   * Provides styling dependent on if the supplied date is within the supplied range or not.
   * @param date `luxon` DateTime
   * @param rangeStart `luxon` DateTime
   * @param rangeEnd `luxon` DateTime
   * @returns array of classes.
   */
  checkRangeMatch(date, rangeStart, rangeEnd) {
    if (!rangeStart || !rangeEnd) {
      return [];
    }
    if (rangeStart > rangeEnd) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
    }
    try {
      let rangeClasses = [];
      if (date < rangeStart || date > rangeEnd) {
        return rangeClasses;
      }
      rangeClasses.push('in-range');
      if (this.selectedEndDate) {
        rangeClasses.push('selected');
      }
      if (this.checkDateMatch(date, rangeStart)) {
        rangeClasses.push('first-date');
      }
      if (this.checkDateMatch(date, rangeEnd)) {
        rangeClasses.push('last-date');
      }
      return rangeClasses;
    } catch {
      return [];
    }
  }

  /**
   * Provides styling to a particular date within a calendar.
   * @param date `luxon` DateTime
   * @returns array of classes
   */
  getDateClasses(date) {
    let classes = ['calendar-date', 'p-1'];
    if (this.checkDisabledDate(date)) {
      return classes;
    }
    classes.push('valid-date');
    if (this.checkDateMatch(date, this.selectedDate)) {
      classes.push('selected');
    }
    if (!this.dateRange) {
      // single day select
      classes.push('first-date');
      classes.push('last-date');
    } else {
      let secondDate = this.hoverDate;
      if (this.selectedEndDate) {
        secondDate = this.selectedEndDate;
      }
      const rangeClasses = this.checkRangeMatch(date, this.selectedDate, secondDate);
      classes = classes.concat(rangeClasses);
    }
    return classes;
  }

  /**
   * Provides styling to a particular month within a calendar.
   * @param month  obj: { name: string, number: number }
   * @returns array of classes
   */
  getMonthClasses(month) {
    let classes = ['btn', 'w-100', 'calendar-month'];
    if (this.minDisplayDepth === 1 && this.checkDisabledMonth(month)) {
      return classes;
    }
    if (this.checkMonth(month, this.calendarConfig.value.year)) {
      classes.push('selected');
    }
    return classes;
  }

  /**
   * Provides styling to a particular year within a calendar.
   * @param year number
   * @returns array of classes
   */
  getYearClasses(year) {
    let classes = ['btn', 'w-100', 'calendar-month'];
    if (this.minDisplayDepth === 2 && this.checkDisabledMonth(year)) {
      return classes;
    }
    if (this.checkYear(year)) {
      classes.push('selected');
    }
    return classes;
  }

  /**
   * Checks if the month passed in is the same as the currently selected start or end months.
   * @param month obj: { name: string, number: number}
   * @param year number
   * @returns boolean - `true` if the month is the same.
   */
  checkMonth(month, year) {
    if (month.number === this.selectedDate?.month && year === this.selectedDate.year) {
      return true;
    }
    if (month.number === this.selectedEndDate?.month && year === this.selectedEndDate?.year) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the year passed in is the same as the currently selected start or end years.
   * @param year number
   * @returns boolean - `true` if the year is the same.
   */
  checkYear(year) {
    if (year === this.selectedDate?.year) {
      return true;
    }
    if (year === this.selectedEndDate?.year) {
      return true;
    }
    return false;
  }

  /**
   * Updates the hover date.
   * @param date `luxon` DateTime
   */
  updateHoverDate(date) {
    if (this.dateRange && this.selectedDate && !this.selectedEndDate) {
      date = this.checkRangeForDisabledDates(date);
    }
    if (date.month === this.calendarConfig?.value?.date?.month) {
      this.changeHoverDate.emit(date);
    }
  }

  /**
   * Decides whether or not to emit a date change when a date is selected.
   * In a rangepicker, if the selected date is outside the permissible range, the click is not propagated. 
   * @param date `luxon` DateTime 
   */
  updateDateOnClick(date) {
    if (this.dateRange && this.selectedDate && !this.selectedEndDate) {
      const limit = this.checkRangeForDisabledDates(date);
      if (limit !== date) {
        this.clearDates.emit();
      }
    }
    this.changeDate.emit(date);
  }

  /**
   * Checks a date to see if there are any disabled dates between itself and the currently selected start date.
   * @param date `luxon` DateTime
   * @returns `luxon` DateTime - the originally supplied date is returned if there are no disabled dates between or if allowing the selection of ranges that include disabled dates. The largest allowable range before a disabled date is encountered is returned otherwise.
   */
  checkRangeForDisabledDates(date) {
    if (this.allowDisabledInRange) {
      return date;
    }
    let increment = 1;
    if (date < this.selectedDate) {
      increment = -1;
    }
    let checkDate = this.selectedDate;
    let rangeLength = 1;
    while (!this.checkDateMatch(date, checkDate)) {
      if (this.disabledDatesFn(checkDate.plus({ days: increment }))) {
        return checkDate;
      }
      if (rangeLength === this.calendarConfig.value.maxRange) {
        return checkDate;
      }
      rangeLength++;
      checkDate = checkDate.plus({ days: increment });
    }
    return date;
  }

  /**
   * Check if a provided date is disabled in the current calendarConfig.
   * @param date `luxon` DateTime
   * @returns boolean - true if the date is disabled or if the date falls outside the current calendarConfig. 
   */
  checkDisabledDate(date) {
    if (date.month !== this.calendarConfig.value.date.month) {
      return true;
    }
    return this.disabledDatesFn(date);
  }

  /**
   * Check if a provided month is disabled in the current calendarConfig.
   * @param month obj: { name: string, number: number }
   * @returns boolean - is the provided month disabled
   */
  checkDisabledMonth(month) {
    if (this.minDisplayDepth === 0) {
      return false;
    }
    let checkDate = this.calendarConfig.value.date;
    checkDate = checkDate.set({ month: month.number }).startOf('month');
    return this.disabledDatesFn(checkDate);
  }

  /**
   * Check if a provided year is disabled in the current calendarConfig.
   * @param year number
   * @returns boolean - is the provided year disabled
   */
  checkDisabledYear(year) {
    if (this.minDisplayDepth <= 1) {
      return false;
    }
    let checkDate = this.calendarConfig.value.date;
    checkDate = checkDate.set({ year: year }).startOf('year');
    return this.disabledDatesFn(checkDate);
  }
}
