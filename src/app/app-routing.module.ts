import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsComponent } from './common-components/common-components/common-components.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { PicklistsComponent } from './forms/picklists/picklists.component';
import { TypeaheadsComponent } from './forms/typeaheads/typeaheads.component';
import { MultiselectsComponent } from './forms/multiselects/multiselects.component';
import { FormsHomeComponent } from './forms/forms-home/forms-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'common-components',
    component: CommonComponentsComponent
  },
  {
    path: 'forms',
    component: FormsComponent,
    children: [
      {
        path: '',
        component: FormsHomeComponent
      },
      {
        path: 'text',
        component: TextInputComponent
      },
      {
        path: 'picklist',
        component: PicklistsComponent
      },
      {
        path: 'typeahead',
        component: TypeaheadsComponent
      },
      {
        path: 'multiselect',
        component: MultiselectsComponent
      }
    ]
  },
  {
    // wildcard route
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
