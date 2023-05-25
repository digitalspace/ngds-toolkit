import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgdsNavCard } from './nav-card.component';

export { NgdsNavCard } from './nav-card.component';

@NgModule({
  imports: [
    CommonModule,
    NgdsNavCard
  ],
  exports:[
    NgdsNavCard
  ]
})
export class NavCardModule { }
