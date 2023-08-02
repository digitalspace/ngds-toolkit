/*
 * Public API Surface of ngds-common-components
 */

import { NgModule } from '@angular/core';

import { NgdsNavCardModule } from './lib/components/nav-card/nav-card.module';
import { NgdsTabsModule } from './lib/components/tabs/tabs.module';

export * from './lib/components/nav-card/nav-card.module';
export * from './lib/components/tabs/tabs.module';

const NGDS_COMMON_COMPONENTS_MODULES = [NgdsNavCardModule, NgdsTabsModule];

@NgModule({
  imports: NGDS_COMMON_COMPONENTS_MODULES,
  exports: NGDS_COMMON_COMPONENTS_MODULES,
})
export class NgdsCommonComponentsModule {}
