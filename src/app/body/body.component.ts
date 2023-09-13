import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  constructor() { }
  ngOnInit(): void {
    const marquee = document.getElementById('marquee') as HTMLMarqueeElement;
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    leftButton?.addEventListener('click', () => {
      marquee.style.animationDirection = 'reverse';
    });

    rightButton?.addEventListener('click', () => {
      marquee.style.animationDirection = 'normal';
    });
  }
}
