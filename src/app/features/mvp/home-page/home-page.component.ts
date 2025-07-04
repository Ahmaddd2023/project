import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit {
  constructor(private viewportScroller: ViewportScroller) {}
  
  @ViewChild('sliderTrack', { static: false }) trackRef!: ElementRef;

    //currentSlideOffset = 0;
    isSliding = false;
   email = '';
   subscribed = false;
   invalidEmail = false;

  ngAfterViewInit(): void {
    this.ensureMinimumSlides();
  }



  nextSlide() {
    if (this.isSliding) return;
    this.isSliding = true;

    const track = this.trackRef.nativeElement as HTMLElement;
    const first = track.children[0] as HTMLElement;
    const slideWidth = first.offsetWidth + 20;

  
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${slideWidth}px)`;

    setTimeout(() => {
      track.style.transition = 'none';
      track.appendChild(first);
      track.style.transform = 'translateX(0)';
      this.isSliding = false;
    }, 500);
  }

  prevSlide() {
    if (this.isSliding) return;
    this.isSliding = true;

    const track = this.trackRef.nativeElement as HTMLElement;
    const last = track.children[track.children.length - 1] as HTMLElement;
    const slideWidth = last.offsetWidth + 20;

   
    track.style.transition = 'none';
    track.insertBefore(last, track.children[0]);
    track.style.transform = `translateX(-${slideWidth}px)`;

   
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = 'translateX(0)';

      setTimeout(() => {
        this.isSliding = false;
      }, 500);
    });
  }


  ensureMinimumSlides() {
    const track = this.trackRef.nativeElement as HTMLElement;
    while (track.children.length < 4) {
      const clone = track.children[0].cloneNode(true);
      track.appendChild(clone);
    }
  }
  
    scrollToSection() {
      const yOffset = 100; 
      const element = document.getElementById('about-product');
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

  subscribe() {
    if (this.validateEmail(this.email)) {
      this.subscribed = true;
      this.invalidEmail = false;
    } else {
      this.invalidEmail = true;
    }
  }

  validateEmail(email: string): boolean {
    return email.includes('@');
  }

}



