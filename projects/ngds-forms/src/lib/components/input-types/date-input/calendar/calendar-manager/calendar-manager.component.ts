import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DateTime, Interval } from 'luxon';
import { BehaviorSubject } from 'rxjs';

interface calendarConfig {
  index: number,
  date?: DateTime,
  monthNumber?: number;
  monthName?: string;
  year?: number;
  weeks?: weekConfig[];
  years?: number[];
}

interface weekConfig {
  dates: DateTime[]
}

@Component({
  selector: 'ngds-calendar-manager',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['../../../../../../../assets/styles/styles.scss']
})
export class NgdsCalendarManager implements OnInit {
  // The control object
  @Input() control: UntypedFormControl;

  // The IANA string pertaining to the luxon timezone in which all DateTime calculations are performed.
  @Input() timezone: string = 'UTC';

  // Whether or not the datepicker will be used to pick a single date or a range of values.
  @Input() dateRange: boolean = false;

  // The precision of the datepicker. By default (0), dates can be picked.
  // If minDisplayDepth is 1 or 2, only months or years will be displayed and enabled, respectively.
  // When picking months or years, the datepicker will return the luxon startOf('term'), where 
  // 'term' is months or years, respectively.  
  @Input() minDisplayDepth: number = 0; // date, 1 = month, 2 = year 

  // The current selected date of the calendar (start date if rangepicker).
  @Input() selectedDate;

  // The current selected end date of the calendar if rangepicker.
  @Input() selectedEndDate;

  // The date the user is hovering over - used for styling.
  @Input() hoverDate;

  // A function that returns a boolean when provided a DateTime. DateTimes that return true are disabled in the calendar.
  @Input() disabledDatesFn;

  // The maximum number of days that can be selected in a rangepicker. Default (0) is unlimited days. 
  @Input() maxRange: number = 0;

  // Whether or not the datepicker is disabled.
  @Input() disabled: boolean = false;

  // Whether or not to allow rangepickers to have disabled dates within the ranges they select.
  @Input() allowDisabledInRange: boolean = false;

  // Emits when a selected date is changed.
  @Output() dateChange = new EventEmitter;

  // Emits when input is cleared.
  @Output() clearDates = new EventEmitter;

  //Emits when the display changes.
  @Output() displayChange = new EventEmitter;

  protected startCalendar = new BehaviorSubject<calendarConfig>({ index: 1 });
  protected endCalendar = new BehaviorSubject<calendarConfig>({ index: 2 });
  protected displayDepth = new BehaviorSubject<number>(0); // date, 1 = month, 2 = year 

  ngOnInit() {
    // set the current display depth to the minimum allowable amount.
    this.displayDepth.next(this.minDisplayDepth);
    this.setToday();
  }

  /**
   * Set today. Set the calendar month to be based on today.
   * If rangepicker, also set the second calendar to be based on a month from today.
   * If displayDepth = 1, set the second calendar to be based on a year from today.
   * If displayDepth = 2, set the second calendar to be based on 12 years from today.
   */
  setToday() {
    const now = this.getNow();
    this.updateCalendarConfig(now, this.startCalendar, false);
    switch (this.displayDepth.value) {
      case 2:
        // Year mode
        this.updateCalendarConfig(now.plus({ years: 12 }), this.endCalendar, false);
        break;
      case 1:
        // Month mode
        this.updateCalendarConfig(now.plus({ years: 1 }), this.endCalendar, false);
        break;
      default:
        // Date mode
        this.updateCalendarConfig(now.plus({ months: 1 }), this.endCalendar, false);
    }
  }

  /**
   * Get the `luxon` DateTime representation of now.
   * @returns `luxon` DateTime object representing now.
   */
  getNow() {
    return DateTime.now().setZone(this.timezone);
  }

  /**
   * Changes the displayed calendar by the set number of units. 
   * If the display depth is 0, the months are changed by the number of units.
   * If the display depth is 1, the years are changed by the number of units.
   * If the display depth is 2, the years are changed by 12x the number of units.
   * @param value The number of units to change the display by.
   */
  changeDisplayByValue(value) {
    switch (this.displayDepth.value) {
      case 2:
        // Year mode
        let multiplier = 1;
        if (value < 0) {
          multiplier = -1;
        }
        this.changeYearByValue(12 * multiplier, this.startCalendar);
        this.changeYearByValue(12 * multiplier, this.endCalendar);
        break;
      case 1:
        // Month mode
        this.changeYearByValue(value, this.startCalendar);
        this.changeYearByValue(value, this.endCalendar);
        break;
      default:
        // Date mode
        this.changeMonthByValue(value, this.startCalendar);
        this.changeMonthByValue(value, this.endCalendar);
    }
  }

  /**
   * Changes the set month of a calendarConfig object by a value.
   * @param value The number of units to change the month by.
   * @param calendar The calendarConfig object to update.
   */
  changeMonthByValue(value, calendar) {
    let cal = calendar.value;
    cal.date = cal.date.plus({ months: value });
    this.updateCalendarConfig(cal.date, calendar, false);
  }

  /**
   * Changes the set year of a calendarConfig object by a value.
   * @param value The number of units to change the year by.
   * @param calendar The calendarConfig object to update.
   */
  changeYearByValue(value, calendar) {
    let cal = calendar.value;
    cal.date = cal.date.plus({ years: value });
    this.updateCalendarConfig(cal.date, calendar, false);
  }

  /**
   * Sets the month of a calendarConfig object to a specific value. Note that
   * `luxon` months are 1-indexed starting in January.
   * @param value Index of the month to set the calendarConfig object.
   * @param calendar The calendarConfig object to update.
   */
  setMonthToValue(value, calendar) {
    let newDate = calendar.value.date;
    newDate = newDate.set({ month: value });
    let otherCalendar = this.endCalendar;
    let increment = 1;
    let incrementType = 'month';
    if (calendar.value.index === 2) {
      otherCalendar = this.startCalendar;
      increment = -1;
    }
    let sendDate = false;
    if (this.minDisplayDepth === 1) {
      newDate = newDate.startOf('month');
      incrementType = 'year';
      sendDate = true;
    }
    this.updateCalendarConfig(newDate, calendar, sendDate);
    this.updateCalendarConfig(newDate.plus({ [incrementType]: increment }), otherCalendar, false);
    this.displayDepth.next(this.minDisplayDepth);
  }

  /**
   * Sets the year of a calendarConfig object to a specific value.
   * @param value The year to set the calendarConfig object to.
   * @param calendar The calendarConfig object to update
   */
  setYearToValue(value, calendar) {
    let newDate = calendar.value.date;
    newDate = newDate.set({ year: value });
    let otherCalendar = this.endCalendar;
    let increment = 1;
    if (calendar.value.index === 2) {
      otherCalendar = this.startCalendar;
      increment = -1;
    }
    let sendDate = false;
    if (this.minDisplayDepth === 2) {
      newDate = newDate.startOf('year');
      increment*=12;
      sendDate = true;
    }
    this.updateCalendarConfig(newDate, calendar, sendDate);
    this.updateCalendarConfig(newDate.plus({ year: increment }), otherCalendar, false);
    this.displayDepth.next(this.minDisplayDepth);
  }

  /**
   * Creates the layout of the date, month, and year calendar objects used as display in the
   * application. Each date calendar consists of 6 weeks (42 days). Each month calendar consists
   * of 12 months. Each year calendar consists of 12 years.
   * @param date `luxon` DateTime object to base the calendar around.
   * @param calendar The calendarConfig object to update.
   * @param emitChange Whether or not to emit this change as a date change.
   */
  updateCalendarConfig(date, calendar, emitChange = true) {
    // Get Sunday of the week the month starts, add 6 weeks to get displayed interval.
    const first = date.startOf('month').startOf('week').minus({ days: 1 });
    const last = first.plus({ days: 42 });
    let dates = Interval.fromDateTimes(first, last).splitBy({ day: 1 }).map(d => d.start);
    let weeks = [];
    let week = [];
    for (const date of dates) {
      if (date.hour !== 0) {
      }
      week.push(date);
      if (week.length > 6) {
        weeks.push(week);
        week = [];
      }
    }
    const index = calendar.value.index;
    calendar.next({
      index: index,
      date: date,
      monthNumber: date.month,
      monthName: date.monthLong,
      year: date.year,
      weeks: weeks,
      years: this.getYears(date.year),
      maxRange: this.maxRange
    });
    this.displayChange.emit();
    if (emitChange) {
      this.sendDate(date);
      this.control.markAsDirty();
    }
  }

  /**
   * Create the array of years used to display the year selection calendar.
   * @param year the year to base the calendar around
   * @returns 3x4 nested array of years
   */
  getYears(year) {
    let first = year - (year % 12);
    let years = [];
    while (years.length < 4) {
      let row = [];
      let i = 0;
      while (i < 3) {
        row.push(first);
        i++;
        first++;
      }
      i = 0;
      years.push(row);
    }
    return years;
  }

  /**
   * Changes the display depth of the calendar. 
   * @param index the display depth to enable
   */
  toggleDepth(index) {
    switch (index) {
      case 2:
        // switching to duodecennial
        this.updateCalendarConfig(this.startCalendar.value.date.plus({ years: 12 }), this.endCalendar, false);
        break;
      case 1:
        // switching to month
        this.updateCalendarConfig(this.startCalendar.value.date.plus({ years: 1 }), this.endCalendar, false);
        break;
      default:
        // switching to date
        this.updateCalendarConfig(this.startCalendar.value.date.plus({ months: 1 }), this.endCalendar);
    }
    if (this.displayDepth.value === index || index < this.minDisplayDepth) {
      this.displayDepth.next(this.minDisplayDepth);
    } else {
      this.displayDepth.next(index);
    }
  }

  /**
   * Update the current value of the last date that was hovered over.
   * @param date `luxon` DateTime that was hovered over.
   */
  updateHoverDate(date) {
    this.hoverDate = date;
  }

  /**
   * Emit the date as a date change to the input controller.
   * @param value `luxon` DateTime.
   */
  sendDate(value) {
    this.dateChange.emit(value)
  }
}
