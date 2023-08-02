/*
 * Public API Surface of ngds-common-components
 */

import { NgModule } from '@angular/core';
import { NgdsForms } from './lib/forms.module';

export * from './lib/forms.module';

const NGDS_FORMS_MODULE = [ NgdsForms ];

@NgModule({
  imports: NGDS_FORMS_MODULE,
  exports: NGDS_FORMS_MODULE,
})
export class NgdsFormsModule { }
