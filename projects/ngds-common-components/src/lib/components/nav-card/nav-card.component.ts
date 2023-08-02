import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngds-nav-card',
  templateUrl: './nav-card.component.html',
  styleUrls: ['./nav-card.component.scss']
})
export class NgdsNavCard {
  @Input() headerText: string = '';
  @Input() headerClasses: string = 'bg-primary text-white'
  @Input() titleText: string = '';
  @Input() bodyText: string = '';
  @Input() navigation: string = '';
  @Input() buttonText: string = 'Go';
  @Input() buttonClasses: string = 'btn-primary px'
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
