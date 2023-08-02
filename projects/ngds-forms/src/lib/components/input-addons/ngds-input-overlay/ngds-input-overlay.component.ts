import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngds-input-overlay',
  templateUrl: './ngds-input-overlay.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsInputOverlayComponent {
  @Input() loading: boolean = false; // Show loading spinner if loading.
}
