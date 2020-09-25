import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer';

let deckId = 0;

@Component({
  selector: 'mix-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {

  deckId = deckId++;
  wavesurfer: any = null;
  currentCue: number = 0;

  ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform' + this.deckId,
      waveColor: '#55f',
      progressColor: '#1af',
      partialRender: true,
      normalize: true,
      cursorColor: '#111'
    });

    this.wavesurfer.load('https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav');
    this.wavesurfer.on('ready', function () {
      // wavesurfer.play();
    });
  }

  playPause() {
    if (this.wavesurfer) {
      this.wavesurfer.playPause();
    }
  }

  cue() {
    if (this.wavesurfer) {
      if (this.wavesurfer.isPlaying()) {
        this.wavesurfer.pause();
        this.wavesurfer.seekTo(this.currentCue);
      } else {
        this.currentCue = this.wavesurfer.getCurrentTime() / this.wavesurfer.getDuration();
      }
    }
  }

  setPitch(value: number) {
    if (this.wavesurfer && typeof value === 'number') {
      this.wavesurfer.setPlaybackRate(value / 50);
    }
  }

}
