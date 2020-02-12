import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { SamplesService } from '../../samples.service';

import * as p5 from 'p5';
import { Subject, Observable } from 'rxjs';

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

  ngOnInit() {
    this.p5 = new p5((p: p5) => {
      const dimensions = (this.el.nativeElement as HTMLElement).getBoundingClientRect();

      p.setup = () => {
        p.createCanvas(dimensions.width, dimensions.height).id('overlay-canvas');
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


  private playRandomSample() {
    const path = this.sample.getRandomSample();
    new Audio(path).play();
  }
}

class Burst {
  public invisible = false;
  private x: number;
  private y: number;
  private radius = 20;
  private ctx: p5;
  private color: p5.Color;
  private alpha = 255;
  private radiusRate: number;
  private alphaRate: number;


  constructor(sketchInstance: p5, xPos: number, yPos: number, radiusRate = 1, alphaRate = 2) {
    this.ctx = sketchInstance;
    this.x = xPos;
    this.y = yPos;
    this.radiusRate = radiusRate;
    this.alphaRate = alphaRate;
    this.color = this.ctx.color(100, 50, 150);
  }

  show() {
    this.ctx.noStroke();
    this.ctx.fill(this.color);
    this.ctx.ellipse(this.x, this.y, this.radius * 2);
    this.ctx.redraw();
  }

  animate() {
    this.radius += this.radiusRate;
    this.alpha -= this.alphaRate;
    this.color.setAlpha(this.alpha);

    if (this.ctx.alpha(this.color) < 1) {
      this.invisible = true;
    }
  }
}
