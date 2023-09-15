import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public items;
  public subscriptions = new Subscription();

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.sidebarService.list.subscribe((res) => {
      this.items = res;
    }));
  }

  navTo(nav) {
    window.location.hash = nav
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
