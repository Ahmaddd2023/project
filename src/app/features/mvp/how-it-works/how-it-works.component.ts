import { AfterViewInit, Component, ElementRef, ViewChild, HostListener  } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
    @ViewChild('sliderTrack', { static: false }) sliderTrackRef!: ElementRef;
    @ViewChild('planTrack', { static: false }) planTrackRef!: ElementRef;
    
    donationAmount: number = 0;
    gradientStyle = '';
    gradientStyle2 = '';

    //currentSlideOffset = 0;
    isSliding = false;

    spendingAmount: number = 0;
    totalAmount: number = 0;
    cashbackAmount: number = 0;
    
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
    
    updateTotals(): void {
  this.totalAmount = this.donationAmount + this.spendingAmount;

  const donationCashbackRate = 500 / 10000;
  const spendingCashbackRate = 5200 / 104000;

  this.cashbackAmount = this.donationAmount * donationCashbackRate +
                        this.spendingAmount * spendingCashbackRate;
}


updateGradient(): void {
  const percent = (this.donationAmount / 10000) * 100;
  this.gradientStyle = `linear-gradient(to right, #0a1748 0%, #f56eac ${percent}%, #f5f5f5 ${percent}%)`;
  this.updateTotals(); 
}

updateGradient2(): void {
  const percent = (this.spendingAmount / 104000) * 100;
  this.gradientStyle2 = `linear-gradient(to right, #0a1748 0%, #f56eac ${percent}%, #f5f5f5 ${percent}%)`;
  this.updateTotals(); 
}


ngOnInit(): void {
  this.updateGradient(); 
  this.updateGradient2(); 
}


}
