import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgdsTab } from './tab/tab.component';
import { NgdsTabRow } from './tab-row/tab-row.component';

export { NgdsTab, NgdsTabRow };

@NgModule({
  declarations: [
    NgdsTab,
    NgdsTabRow
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgdsTab,
    NgdsTabRow
  ]
})
export class NgdsTabsModule { }
