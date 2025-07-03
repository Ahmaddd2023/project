import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  countdown: { value: number; label: string }[] = [];
  activeTab: string = 'mission';
  videoOpen = false;
  @ViewChild('sliderTrack', { static: false }) sliderTrackRef!: ElementRef;
  @ViewChild('planTrack', { static: false }) planTrackRef!: ElementRef;
  selectedPlan: string | null = null;
  
  //currentSlideOffset = 0;
  isSliding = false;
  
  tabs = [
    { key: 'mission', label: 'OUR MISSION' },
    { key: 'quality', label: 'OUR QUALITY' },
    { key: 'vision', label: 'OUR VISION' },
    { key: 'security', label: 'TOP SECURITY' }
  ];

  ngOnInit(): void {
    const localKey = 'missionCountdownStart';

    let startTime = localStorage.getItem(localKey);

    if (!startTime) {
      const now = new Date();
      const startedAt = new Date(
        now.getTime() -
          702 * 24 * 60 * 60 * 1000 - 
          15 * 60 * 60 * 1000 -      
          25 * 60 * 1000             
      );
      startTime = startedAt.toISOString();
      localStorage.setItem(localKey, startTime);
    }

    const startDate = new Date(startTime);

    setInterval(() => {
      this.updateCountdown(startDate);
    }, 1000);
  }

  updateCountdown(startDate: Date) {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdown = [
      { value: days, label: 'Days' },
      { value: hours, label: 'Hours' },
      { value: minutes, label: 'Minutes' },
      { value: seconds, label: 'Seconds' },
    ];
  }
  
  openVideo() {
      this.videoOpen = true;
    }

  closeVideo() {
      this.videoOpen = false;
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
    


    selectPlan(plan: string) {
      this.selectedPlan = plan;
    }



}
