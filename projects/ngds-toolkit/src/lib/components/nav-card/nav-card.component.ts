import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngds-nav-card',
  standalone: true,
  templateUrl: './nav-card.component.html',
  styleUrls: ['./nav-card.component.scss']
})
export class NgdsNavCard {
  @Input() headerText: string = '';
  @Input() titleText: string = '';
  @Input() bodyText: string = '';
  @Input() navigation: string = '';
  @Input() buttonText: string = 'Go';
  @Input() navIsRelative: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  navigate(nav) {
    if (this.navIsRelative) {
      this.router.navigate([nav], { relativeTo: this.route });
    } else {
      this.router.navigate([nav]);
    }
  }
}
