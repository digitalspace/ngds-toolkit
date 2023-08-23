/*
 * Public API Surface of ngds-common-components
 */

import { NgModule } from '@angular/core';
import { NgdsForms } from './lib/forms.module';

export * from './lib/forms.module';

const NGDS_COMMON_COMPONENTS_MODULES = [ NgdsForms ];

@NgModule({
  imports: NGDS_COMMON_COMPONENTS_MODULES,
  exports: NGDS_COMMON_COMPONENTS_MODULES,
})
export class NgdsFormsModule { }
