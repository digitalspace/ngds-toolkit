import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgdsInput } from './components/input-types/ngds-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgdsTextInput } from './components/input-types/text-input/text-input.component';
import { NgdsPicklistInput } from './components/input-types/picklist-input/picklist-input.component';
import { NgdsInputHeader } from './components/input-addons/ngds-input-header/ngds-input-header.component';
import { NgdsInputFooter } from './components/input-addons/ngds-input-footer/ngds-input-footer.component';
import { NgdsInputOverlayComponent } from './components/input-addons/ngds-input-overlay/ngds-input-overlay.component';
import { BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgdsTypeaheadInput } from './components/input-types/typeahead-input/typeahead-input.component';
import { NgdsMultiselectItem } from './components/input-addons/multiselect-item/multiselect-item.component';
import { NgdsDateInput } from './components/input-types/date-input/date-input.component';
import { NgdsCalendar } from './components/input-types/date-input/calendar/calendar/calendar.component';
import { NgdsCalendarManager } from './components/input-types/date-input/calendar/calendar-manager/calendar-manager.component';

export { NgdsInput, NgdsTextInput, NgdsPicklistInput, NgdsTypeaheadInput, NgdsInputHeader, NgdsInputFooter, NgdsDateInput};

@NgModule({
  declarations: [
    NgdsInput,
    NgdsTextInput,
    NgdsPicklistInput,
    NgdsInputHeader,
    NgdsInputFooter,
    NgdsInputOverlayComponent,
    NgdsTypeaheadInput,
    NgdsMultiselectItem,
    NgdsDateInput,
    NgdsCalendar,
    NgdsCalendarManager
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    BsDropdownDirective,
    provideAnimations()
  ],
  exports: [
    NgdsInput,
    NgdsInputHeader,
    NgdsInputFooter,
    NgdsTextInput,
    NgdsPicklistInput,
    NgdsTypeaheadInput,
    NgdsDateInput
  ],
})
export class NgdsForms { }
