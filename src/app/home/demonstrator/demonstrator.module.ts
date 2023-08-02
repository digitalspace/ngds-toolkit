import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemonstratorComponent } from './demonstrator.component';
import { NgdsTabsModule } from 'projects/ngds-common-components/src/public-api';
import { MonitorComponent } from './monitor/monitor.component';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    DemonstratorComponent,
    MonitorComponent
  ],
  imports: [
    CommonModule,
    NgdsTabsModule,
    HighlightModule
  ],
 
  exports: [
    DemonstratorComponent
  ]
})
export class DemonstratorModule { }
