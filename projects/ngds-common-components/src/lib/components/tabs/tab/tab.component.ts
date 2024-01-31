import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngds-tab',
  templateUrl: './tab.component.html'
})
export class NgdsTab {
  @Input() id: string; // tab id
  @Input() title: string; // tab title
  @Input() active: boolean = false;
}
