import { Component } from '@angular/core';

@Component({
  selector: 'forms-home',
  templateUrl: './forms-home.component.html',
  styleUrls: ['./forms-home.component.scss']
})
export class FormsHomeComponent {

  public installCode = `  yarn add @digitalspace/ngds-forms`;

  public peerDepCode = `  yarn add bootstrap
  yarn add bootstrap-icons`

  public moduleCode = `  import { NgdsFormsModule } from '@digitalspace/ngds-toolkit';

  @NgModule({
    ...
    imports [
      NgdsFormsModule
    ],
    ...
  ])
  export class ComponentModule {}
  }`

}
