import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TappableAreaComponent } from './tappable-area.component';

describe('TappableAreaComponent', () => {
  let component: TappableAreaComponent;
  let fixture: ComponentFixture<TappableAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TappableAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TappableAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
