import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './models/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations : [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'ui';

  constructor(private contexts : ChildrenOutletContexts) {}

  getRouteAnimationData(){
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.['animation'];
  }
}
