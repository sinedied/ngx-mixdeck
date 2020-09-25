import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'mix-fader',
  template: `
  <div class="marks"></div>
  <div class="hole"></div>
  <div class="label">TEMPO</div>
  <input id="pitch" class="slider" type="range" min="0" max="100" value="50" step="0.1" (input)="updateValue($event.target.value)"/>
  `,
  styleUrls: ['./fader.component.scss']
})
export class FaderComponent {

  style: SafeStyle;

  @Input()
  value = 50;

  @Output()
  change = new EventEmitter<number>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resize();
  }

  @HostBinding('style')
  get styles(): SafeStyle {
    return this.style;
  }

  constructor(private element: ElementRef) {
    this.resize();
  }

  resize() {
    const element = this.element.nativeElement;
    const width = element.clientWidth;// * .98;
    const height = element.clientHeight;// * .98;
    // We need to resize with JS unfortunately
    // because the fader is rotated, so we have
    // to swap width & height
    this.style = {
      '--width': width + 'px',
      '--height': height + 'px'
      //width: height + 'px',
      //height: width + 'px'
    };
  }

  updateValue(inputValue: string) {
    const value = parseFloat(inputValue);
    this.change.emit(value);
  }

}
