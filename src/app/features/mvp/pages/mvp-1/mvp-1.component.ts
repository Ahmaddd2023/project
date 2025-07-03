import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mvp-1',
  templateUrl: './mvp-1.component.html',
  styleUrls: ['./mvp-1.component.scss'],
})
export class Mvp1Component implements OnInit {
  isDisabled = true; 
  
  cards: string[] = [
  'assets/images/cardd1.svg',
  'assets/images/cardd2.svg',
  'assets/images/cardd3.svg',
  'assets/images/cardd4.svg',
  'assets/images/cardd5.svg',
  'assets/images/cardd6.svg',
  'assets/images/cardd7.svg',
  'assets/images/cardd8.svg',
  'assets/images/cardd9.svg',
  'assets/images/cardd10.svg',
  ];

  activeIndex = 0;
  previousIndex = -1;
  nextIndex = 1;
  intervalId: any;



  constructor(private store: Store, private router: Router) {}



  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.previousIndex = this.activeIndex;
      this.activeIndex = this.nextIndex;
      this.nextIndex = (this.nextIndex + 1) % this.cards.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }


  goToDomain(domain: string, path: string): void {
    window.location.href = `https://${domain}${path}`;
  }
}
