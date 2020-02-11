import { Component } from '@angular/core';
import { SamplesService } from './core/samples.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chimes';

  constructor(private samples: SamplesService) {}

  public play() {
    const path = this.samples.getRandomSample();
    new Audio(path).play();
  }
}
