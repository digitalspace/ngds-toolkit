/*
 * Public API Surface of ngds-toolkit
 */
import { NgModule } from '@angular/core';

import { NavCardModule } from './lib/components/nav-card/nav-card.module';
import { NgdsTabsModule } from './lib/components/tabs/tabs.module';

export * from './lib/components/nav-card/nav-card.module';
export * from './lib/components/tabs/tabs.module';

const NGDS_MODULES = [
  NavCardModule,
  NgdsTabsModule,
];

@NgModule({
  imports: NGDS_MODULES,
  exports: NGDS_MODULES
})
export class NgdsToolkitModule { }