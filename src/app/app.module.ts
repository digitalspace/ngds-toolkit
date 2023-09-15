import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppComponent } from './app.component';
import { NgdsNavCardModule, NgdsTabsModule } from 'projects/ngds-common-components/src/public-api';
import { NgdsFormsModule } from 'projects/ngds-forms/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from './forms/forms.module';
import { CommonComponentsComponent } from './common-components/common-components/common-components.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, CommonComponentsComponent, HomeComponent, SidebarComponent],
  imports: [BrowserModule, FormsModule, NgdsFormsModule, NgdsTabsModule, NgdsNavCardModule, AppRoutingModule, RouterModule.forRoot([])],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // fullLibraryLoader: () => import('highlight.js')
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        },
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
