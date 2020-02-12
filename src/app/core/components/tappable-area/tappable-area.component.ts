import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import * as p5 from 'p5';

import { SamplesService } from '../../samples.service';
import { Burst } from '../../classes/burst';

@Component({
  selector: 'app-tappable-area',
  templateUrl: './tappable-area.component.html',
  styleUrls: ['./tappable-area.component.scss']
})
export class TappableAreaComponent implements OnInit {
  p5: p5;
  mouseX: number;
  mouseY: number;
  bursts: Burst[] = [];

  constructor(private sample: SamplesService,
              private el: ElementRef) { }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.p5.resizeCanvas(this.tappableAreaDimensions.width, this.tappableAreaDimensions.height);
  }

  ngOnInit() {
    this.p5 = new p5((p: p5) => {

      p.setup = () => {
        p.createCanvas(this.tappableAreaDimensions.width, this.tappableAreaDimensions.height).id('overlay-canvas');
      };

      p.draw = () => {
        p.background(24);

        for (const burst of this.bursts) {
          burst.show();
          burst.animate();

          if (burst.invisible) {
            this.bursts = this.bursts.filter(e => e !== burst);
          }
        }
      };
    }, this.el.nativeElement.querySelector('.tappable-area__canvas-outlet'));
  }

  public onClick(event: MouseEvent) {
    this.playRandomSample();
    const nextBurst = new Burst(this.p5, event.clientX, event.clientY);
    this.bursts.push(nextBurst);
  }

  private get tappableAreaDimensions(): DOMRect | ClientRect {
    return (this.el.nativeElement as HTMLElement).getBoundingClientRect();
  }

  private playRandomSample() {
    const path = this.sample.getRandomSample();
    new Audio(path).play();
  }
}
