import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'ngds-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsDateInput extends NgdsInput implements AfterViewInit {
  // Whether or not the datepicker will be used to pick a single date or a range of values.
  @Input() dateRange: boolean = false;

  // The luxon token string that will be used to convert between DateTime and control value.
  @Input() dateFormat: string = 'yyyy-MM-dd';

  // The luxon token string that will be used to convert between DateTime and control display.
  // If unset, it will be the same as dateFormat.
  @Input() dateDisplayFormat: string;

  // The IANA string pertaining to the luxon timezone in which all DateTime calculations are performed.
  @Input() timezone: string = 'UTC';

  // A DateTime object, after which all future dates are disabled.
  @Input() maxDate: DateTime = null;

  // A DateTime object, before which all past dates are disabled.
  @Input() minDate: DateTime = null;

  // The minimum level of precision the datepicker/rangepicker will display.
  // 0 = date, 1 = month, 2 = year
  @Input() minMode: number = 0;

  // The maximum allowable length of a selected range. No limit if set to 0.
  @Input() maxRange: number = 0;

  // The string used in the input display to separate the start and end display strings of a range.
  @Input() rangeSeparator: string = 'to';

  // Whether or not to display the datepicker/rangepicker inline.
  @Input() inline: boolean = false;

  // Whether or not to allow range selections to include disabled dates. 
  @Input() allowDisabledInRange: boolean = false;

  // A function that takes a DateTime as an argument and returns a boolean.
  // If the function returns true, the date associated with the supplied DateTime will be disabled.
  // If the function returns false, the date associated with the supplied DateTime will be available to select.
  @Input() customDisabledDatesCallback: (date: DateTime) => boolean;

  // The dropdown that contains the datepicker/rangepicker calendar(s).
  @ViewChild('dropdown') dropdown: ElementRef;

  protected currentDisplay;
  protected selectedDate = new BehaviorSubject<any>(null);
  protected selectedEndDate = new BehaviorSubject<any>(null);

  constructor(
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    // Subscribe to the datepicker closing
    this.dropdown.nativeElement.addEventListener('hide.bs.dropdown', () => this.onCalendarHide());
    // Set dateDisplayFormat to dateFormat if not provided
    if (!this.dateDisplayFormat) {
      this.dateDisplayFormat = this.dateFormat;
    }
    // Add control validator that triggers when luxon encounters an 'Invalid DateTime'
    this.control.addValidators([this.invalidDateValidator()])
    // Subscribe to changes in the control value
    this.subscriptions.add(this.control.valueChanges.subscribe((e) => {
      this.updateSelectedDates(e)
      this.matchDisplayToControl();
    }));
    if (this.control?.value) {
      this.updateSelectedDates(this.control.value);
    }
    this.matchDisplayToControl();
    this.cd.detectChanges();
  }

  /**
   * Invalidates the control if `luxon` encounters an 'Invalid DateTime' error.
   * @returns ValidationErrors | null
   */
  invalidDateValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      if (this.currentDisplay === 'Invalid DateTime') {
        return { invalidDateTime: ' ' };
      }
      return null
    }
  }

  /**
   * Every available date is passed through this function, and is disabled if the function returns true.
   * @param date `luxon` DateTime
   * @returns boolean
   */
  disabledDatesFn(date): boolean {
    if (this.isDisabled) {
      return true;
    }
    if (this.minMode === 0) {
      if (this.maxDate && date > this.maxDate) {
        return true;
      }
      if (this.minDate && date < this.minDate) {
        return true;
      }
    }
    if (this.minMode === 1) {
      if (this.maxDate && date.month > this.maxDate.month){
        return true;
      }
      if (this.minDate && date.month < this.minDate.month){
        return true;
      }
    }
    if (this.minMode === 2) {
      if (this.maxDate && date.year > this.maxDate.year){
        return true;
      }
      if (this.minDate && date.year < this.minDate.year){
        return true;
      }
    }
    if (this.customDisabledDatesCallback && this.customDisabledDatesCallback(date)) {
      return true;
    }
    return false;
  }

  /**
   * Handles when new dates are selected from the calendar elements.
   * @param e `luxon` DateTime
   */
  handleDateChange(e) {
    if (this.disabledDatesFn(e)) {
      return;
    }
    this.control.markAsTouched();
    if (this.dateRange) {
      // create array of start/end dates
      if (this.selectedDate.value && !this.selectedEndDate.value) {
        // selecting the end date
        let newDate = e;
        if (this.selectedDate.value > newDate) {
          newDate = this.selectedDate.value;
          this.selectedDate.next(e);
        }
        if (this.dateFormat) {
          this.control.setValue([this.convertDateTimeToFormat(this.selectedDate.value), this.convertDateTimeToFormat(newDate)]);
        } else {
          this.control.setValue([this.selectedDate.value, newDate]);
        }
      } else {
        // clear the dates and restart
        this.currentDisplay = `${this.convertDateTimeToFormat(e, this.dateDisplayFormat)} ${this.rangeSeparator} ...`;
        this.selectedDate.next(e);
        this.selectedEndDate.next(null);
      }
    } else {
      if (this.dateFormat) {
        this.control.setValue(this.convertDateTimeToFormat(e));
      } else {
        this.control.setValue(e);
      }
    }
  }

  /**
   * Clears any currently selected dates from the calendar.
   */
  handleClearDates() {
    this.selectedDate.next(null);
    this.selectedEndDate.next(null);
  }

  /**
   * Matches the control display to its value
   */
  matchDisplayToControl() {
    try {
      let date = this.control.value;
      if (this.dateRange) {
        this.currentDisplay = `${this.convertValueToFormat(date[0])} ${this.rangeSeparator} ${this.convertValueToFormat(date[1])}`;
      } else {
        this.currentDisplay = this.convertValueToFormat(date);
      }
      if (this.currentDisplay === 'Invalid DateTime') {
        throw 'Invalid DateTime'
      }
    } catch (err) {
      this.currentDisplay = this.control.value;
    }
  }

  /**
   * When the control value changes, we must update the currently selected date.
   * If the control is a rangepicker, we must make sure the selected dates are in chronological order.
   * @param e control change value
   */
  updateSelectedDates(e) {
    if (this.dateRange) {
      // expect array
      if (!e?.length || e.length < 2) {
        this.selectedDate.next(null);
        this.selectedEndDate.next(null);
      } else {
        if (e[0] > e[1]) {
          // organize smallest to largest
          [e[0], e[1]] = [e[1], e[0]];
        }
        if (this.dateFormat) {
          this.selectedDate.next(DateTime.fromFormat(e[0], this.dateFormat, { zone: this.timezone }));
          this.selectedEndDate.next(DateTime.fromFormat(e[1], this.dateFormat, { zone: this.timezone }));
        } else {
          this.selectedDate.next(e[0]);
          this.selectedEndDate.next(e[1]);
        }
      }
    } else {
      // expect string
      if (this.dateFormat && e) {
        this.selectedDate.next(DateTime.fromFormat(e, this.dateFormat, { zone: this.timezone }));
      } else {
        this.selectedDate.next(e || null);
      }
    }
  }

  /**
   * Parses a formatted string into a `luxon` DateTime.
   * @param value string to parse into DateTime
   * @param format expected string format
   * @returns `luxon` DateTime
   */
  convertFormatToDateTime(value, format = this.dateFormat) {
    return DateTime.fromFormat(value, format, { zone: this.timezone });
  }

  /**
   * Formats a `luxon` DateTime into a string.
   * @param dt `luxon` DateTime
   * @param format proposed string format
   * @returns string
   */
  convertDateTimeToFormat(dt, format = this.dateFormat) {
    return dt.toFormat(format);
  }

  /**
   * Converts a control value into a display value if dateFormat and dateDisplayFormat are different.
   * @param value string 
   * @returns string formatted for display
   */
  convertValueToFormat(value) {
    let dt = value;
    if (this.dateFormat) {
      dt = this.convertFormatToDateTime(value);
    }
    return dt.toFormat(this.dateDisplayFormat)
  }

  /**
   * When the dropdown closes, match the display to the actual control value.
   * We can trigger this reset by just setting the control value to itself. 
   */
  onCalendarHide() {
    this.control.setValue(this.control?.value);
  }
};
