import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsComponent } from './forms.component';
import { PicklistsComponent } from './picklists/picklists.component';
import { TypeaheadsComponent } from './typeaheads/typeaheads.component';
import { NgdsFormsModule } from 'projects/ngds-forms/src/public-api';
import { DemonstratorModule } from '../home/demonstrator/demonstrator.module';
import { NgdsNavCardModule, NgdsTabsModule } from 'projects/ngds-common-components/src/public-api';
import { TextInputComponent } from './text-input/text-input.component';
import { HighlightModule } from 'ngx-highlightjs';
import { MultiselectsComponent } from './multiselects/multiselects.component';
import { RouterModule } from '@angular/router';
import { FormsHomeComponent } from './forms-home/forms-home.component';
import { DatepickersComponent } from './datepicker/datepickers/datepickers.component';
import { RangepickersComponent } from './datepicker/rangepickers/rangepickers.component';
import { TogglesComponent } from './toggles/toggles.component';
import { NumbersComponent } from './numbers/numbers.component';

@NgModule({
  declarations: [
    FormsComponent,
    PicklistsComponent,
    TypeaheadsComponent,
    TextInputComponent,
    MultiselectsComponent,
    FormsHomeComponent,
    DatepickersComponent,
    RangepickersComponent,
    TogglesComponent,
    NumbersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgdsFormsModule,
    DemonstratorModule,
    NgdsTabsModule,
    HighlightModule,
    NgdsNavCardModule,
    RouterModule
  ],
  providers: [
    HttpClient
  ],
  exports: [
    FormsComponent,
    PicklistsComponent,
    TypeaheadsComponent,
    TextInputComponent,
    MultiselectsComponent,
    DatepickersComponent,
    RangepickersComponent,
    TogglesComponent,
    NumbersComponent
  ]
})
export class FormsModule { }
