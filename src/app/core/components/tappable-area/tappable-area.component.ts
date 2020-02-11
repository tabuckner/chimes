import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { SamplesService } from '../../samples.service';

import * as p5 from 'p5';

@Component({
  selector: 'app-tappable-area',
  templateUrl: './tappable-area.component.html',
  styleUrls: ['./tappable-area.component.scss']
})
export class TappableAreaComponent implements OnInit {
  p5: p5;
  mouseX: number;
  mouseY: number;

  constructor(private sample: SamplesService,
              private el: ElementRef) { }

  ngOnInit() {
    this.p5 = new p5((p: p5) => {
      const x = 100;
      const y = 100;
      const dimensions = (this.el.nativeElement as HTMLElement).getBoundingClientRect();

      p.setup = () => {
        p.createCanvas(dimensions.width, dimensions.height).id('overlay-canvas');
      };

      p.draw = () => {
        p.background(24);
        p.fill(255);
        if (!this.mouseX || !this.mouseY) {
          return;
        }
        p.rect(this.mouseX, this.mouseY, 25, 25);
      };
    }, this.el.nativeElement.querySelector('.tappable-area__canvas-outlet'));
  }

  public onClick(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    const path = this.sample.getRandomSample();
    new Audio(path).play();
    this.p5.redraw();
  }

}
