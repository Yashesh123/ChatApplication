import { DataService } from 'src/app/services/data-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {

  showCallComponent = false;

  constructor(private dataService: DataService){
    this.dataService.loadCallComponentObservable$.subscribe(
      (shouldShowCallComponent) => this.showCallComponent = shouldShowCallComponent
    )
  }



}
