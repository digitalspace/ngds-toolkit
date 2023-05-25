/*
 * Public API Surface of ngds-toolkit
 */
import { NgModule } from '@angular/core';

import { NavCardModule } from './lib/components/nav-card/nav-card.module';

export { NgdsNavCard, NavCardModule } from  './lib/components/nav-card/nav-card.module';

const NGDS_MODULES = [
  NavCardModule
];

@NgModule({
  imports: NGDS_MODULES,
  exports: NGDS_MODULES
})
export class NgdsToolkitModule { }