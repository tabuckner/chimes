import { Injectable } from '@angular/core';

const SAMPLE_PATHS = [
  './assets/samples/Ab4.mp3',
  './assets/samples/Bb3.mp3',
  './assets/samples/Bb4.mp3',
  './assets/samples/C4.mp3',
  './assets/samples/C5.mp3',
  './assets/samples/Db4.mp3',
  './assets/samples/F3.mp3',
  './assets/samples/Gb4.mp3',
  // './assets/samples/Ab4.mp3',
];

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  constructor() { }

  public getRandomSample(): string {
    return SAMPLE_PATHS[Math.floor(Math.random() * SAMPLE_PATHS.length)];
  }
}
