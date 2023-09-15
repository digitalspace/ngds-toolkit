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
import { appResolver } from './app.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {clear: appResolver},
    component: HomeComponent,
  },
  {
    path: 'common-components',
    resolve: {clear: appResolver},
    component: CommonComponentsComponent
  },
  {
    path: 'forms',
    resolve: {clear: appResolver},
    component: FormsComponent,
    children: [
      {
        path: '',
        resolve: {clear: appResolver},
        component: FormsHomeComponent
      },
      {
        path: 'text',
        resolve: {clear: appResolver},
        component: TextInputComponent
      },
      {
        path: 'picklist',
        resolve: {clear: appResolver},
        component: PicklistsComponent
      },
      {
        path: 'typeahead',
        resolve: {clear: appResolver},
        component: TypeaheadsComponent
      },
      {
        path: 'multiselect',
        resolve: {clear: appResolver},
        component: MultiselectsComponent
      }
    ]
  },
  {
    // wildcard route
    path: '**',
    resolve: {clear: appResolver},
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
