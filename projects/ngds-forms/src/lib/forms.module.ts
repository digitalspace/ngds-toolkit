import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgdsInput } from './components/input-types/ngds-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgdsTextInput } from './components/input-types/text-input/text-input.component';
import { NgdsPicklistInput } from './components/input-types/picklist-input/picklist-input.component';
import { NgdsInputHeader } from './components/input-addons/ngds-input-header/ngds-input-header.component';
import { NgdsInputFooter } from './components/input-addons/ngds-input-footer/ngds-input-footer.component';
import { NgdsInputOverlayComponent } from './components/input-addons/ngds-input-overlay/ngds-input-overlay.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgdsTypeaheadInput } from './components/input-types/typeahead-input/typeahead-input.component';
import { NgdsMultiselectItem } from './components/input-addons/multiselect-item/multiselect-item.component';
import { NgdsDateInput } from './components/input-types/date-input/date-input.component';
import { NgdsCalendar } from './components/input-types/date-input/calendar/calendar/calendar.component';
import { NgdsCalendarManager } from './components/input-types/date-input/calendar/calendar-manager/calendar-manager.component';
import { NgdsToggleInput } from './components/input-types/toggle-input/toggle-input.component';
import { NgdsNumberInput } from './components/input-types/number-input/number-input.component';
import { NgdsDropdown } from './components/input-types/ngds-dropdown.component';

export { NgdsInput, NgdsDropdown, NgdsTextInput, NgdsPicklistInput, NgdsTypeaheadInput, NgdsInputHeader, NgdsInputFooter, NgdsDateInput, NgdsToggleInput, NgdsNumberInput};

@NgModule({
  declarations: [
    NgdsInput,
    NgdsDropdown,
    NgdsTextInput,
    NgdsPicklistInput,
    NgdsInputHeader,
    NgdsInputFooter,
    NgdsInputOverlayComponent,
    NgdsTypeaheadInput,
    NgdsMultiselectItem,
    NgdsDateInput,
    NgdsCalendar,
    NgdsCalendarManager,
    NgdsToggleInput,
    NgdsNumberInput
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimations()
  ],
  exports: [
    NgdsInput,
    NgdsDropdown,
    NgdsInputHeader,
    NgdsInputFooter,
    NgdsTextInput,
    NgdsPicklistInput,
    NgdsTypeaheadInput,
    NgdsDateInput,
    NgdsToggleInput,
    NgdsNumberInput,
  ],
})
export class NgdsForms { }
