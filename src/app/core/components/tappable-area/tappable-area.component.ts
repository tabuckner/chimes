import { Component, OnInit } from '@angular/core';
import { SamplesService } from '../../samples.service';

@Component({
  selector: 'app-tappable-area',
  templateUrl: './tappable-area.component.html',
  styleUrls: ['./tappable-area.component.scss']
})
export class TappableAreaComponent implements OnInit {

  constructor(private sample: SamplesService) { }

  ngOnInit() {
  }

  public onClick(event: MouseEvent) {
    console.warn(event.screenX, event.screenY);
    const path = this.sample.getRandomSample();
    new Audio(path).play();
  }

}
