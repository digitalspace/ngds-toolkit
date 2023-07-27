import { Component, AfterViewInit, OnDestroy, ContentChildren, Input, ChangeDetectorRef } from '@angular/core';
import { NgdsTab } from '../tab/tab.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngds-tab-row',
  templateUrl: './tab-row.component.html',
  styleUrls: ['./tab-row.component.scss']
})
export class NgdsTabRow implements AfterViewInit, OnDestroy {
  // set if you want a tab to be activated by default
  @Input() defaultActiveTabId: string = '';
  // classes applied to the tab row wrapper
  @Input() tabRowClass: string = '';
  public subscriptions = new Subscription();
  public tabs: NgdsTab[] = [];

  @ContentChildren(NgdsTab) tabsElements: NgdsTab;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    // create list of included tabs
    this.tabs = this.tabsElements?.['_results'];
    this.defaultTabList();
    // activate first tab if currentActiveTab is set
    if (this.defaultActiveTabId) {
      this.activateTab(this.defaultActiveTabId);
    }
    this.cd.detectChanges();
  }

  // format tabs missing id and title
  defaultTabList(){
    for (const tab in this.tabs) {
      if (!this.tabs[tab].id) {
        this.tabs[tab].id = 'tab-' + tab;
      }
      if (!this.tabs[tab].title) {
        this.tabs[tab].title = this.tabs[tab].id;
      }
    }
  }
  
  // activate tab by tab id
  activateTab(tabId) {
    for (const tab of this.tabs) {
      if (tab.id === tabId) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
