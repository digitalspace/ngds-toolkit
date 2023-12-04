import { Component, Input } from '@angular/core';

@Component({
  selector: 'monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent {
  @Input() control;

  getStatusClass() {
    if (this.control?.status === 'DISABLED') {
      return 'text-secondary'
    }
    if (this.control?.status === 'INVALID') {
      return 'text-danger'
    }
    return ''
  }

  resetInput() {
    this.control.reset();
  }

  logToConsole() {
    console.log('Control:', this.control);
  }

  getValueClass() {
    if (this.control?.value === '' || this.control?.value?.length === 0) {
      return 'text-primary';
    }
    if (this.control?.value === null || this.control?.value === undefined) {
      return 'text-danger';
    }
    return ''
  }

  getValue() {
    if (this.control?.value === '') {
      return '<empty string>';
    }
    if (this.control?.value?.length === 0 && Array.isArray(this.control.value)) {
      return '<empty array>';
    }
    if (this.control?.value?.length > 0 && Array.isArray(this.control.value)) {
      return `[ ` + this.control.value.join(', ') + ` ]`;
    }
    if (this.control?.value === null) {
      return '<null>';
    }
    if (this.control?.value === undefined) {
      return '<undefined>';
    }
    return this.control.value || null;
  }

  getTouchedClass() {
    if (this.control?.touched) {
      return 'text-primary';
    }
    return 'text-secondary';
  }

  getTouchedString() {
    if (this.control?.touched) {
      return 'TOUCHED';
    }
    return 'UNTOUCHED';
  }

  getPristineClass() {
    if (this.control?.pristine) {
      return 'text-secondary';
    }
    return 'text-danger';
  }

  getPristineString() {
    if (this.control?.pristine) {
      return 'PRISTINE';
    }
    return 'DIRTY';
  }

}
