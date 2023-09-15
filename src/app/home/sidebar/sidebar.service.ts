import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public list = new BehaviorSubject<any>([]);

  constructor() { }

  updateList(items) {
    this.list.next(items);
  }

}
