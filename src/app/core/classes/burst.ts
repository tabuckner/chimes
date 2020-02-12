import * as p5 from 'p5';

export class Burst {
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
