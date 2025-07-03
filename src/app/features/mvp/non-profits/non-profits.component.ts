import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-non-profits',
  templateUrl: './non-profits.component.html',
  styleUrls: ['./non-profits.component.scss']
})
export class NonProfitsComponent {
    countdown: { value: number; label: string }[] = [];
    @ViewChild('sliderTrack', { static: false }) sliderTrackRef!: ElementRef;
    @ViewChild('planTrack', { static: false }) planTrackRef!: ElementRef;
    
  

    videoOpen = false;
    selectedImage: string = '/assets/images/1863.webp';
    activeYear: string = '1863'; 
    previousImage: string = '';
    
    //currentSlideOffset = 0;
    isSliding = false;
    
    selectedAmount: number | null = null;
    customAmount: number | null = null;
    predefinedAmounts: number[] = [10, 25, 50, 100];
    
    
    charitySearch: string = '';
    selectedCharity: string | null = null;
    dropdownOpen: boolean = false;    
    

    


    ngOnInit(): void {

  }




  ngAfterViewInit(): void {
      this.ensureMinimumSlides(this.sliderTrackRef.nativeElement);
      this.ensureMinimumSlides(this.planTrackRef.nativeElement);

  }


    nextSlide(track: HTMLElement) {
      if (this.isSliding) return;
      this.isSliding = true;

      const first = track.children[0] as HTMLElement;
      const slideWidth = first.offsetWidth + 20;

      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        track.appendChild(first);
        this.isSliding = false;
      }, 500);
    }

    prevSlide(track: HTMLElement) {
      if (this.isSliding) return;
      this.isSliding = true;

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


    ensureMinimumSlides(track: HTMLElement) {
      while (track.children.length < 4) {
        const clone = track.children[0].cloneNode(true);
        track.appendChild(clone);
      }
    }

  





}
