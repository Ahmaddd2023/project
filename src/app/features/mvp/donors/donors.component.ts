import { AfterViewInit, Component, ElementRef, ViewChild, HostListener  } from '@angular/core';


@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss']
})
export class DonorsComponent {
  countdown: { value: number; label: string }[] = [];
  @ViewChild('sliderTrack', { static: false }) sliderTrackRef!: ElementRef;
  @ViewChild('planTrack', { static: false }) planTrackRef!: ElementRef;
  @ViewChild('mapTrack', { static: false }) mapTrackRef!: ElementRef;
  
  @ViewChild('videoPlayer', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;
  isMuted: boolean = true;
  videoPlayed: boolean = false;
  
  //currentSlideOffset = 0;
  isSliding = false;
  
  selectedAmount: number | null = null;
  customAmount: number | null = null;
  predefinedAmounts: number[] = [10, 25, 50, 100];
    
  charitySearch: string = '';
  selectedCharity: string | null = null;
  dropdownOpen: boolean = false;    
    
    
  charities: string[] = [
      'St. Jude Children\'s Research Hospital',
      'VERBANK UNITED METHODIST CHURCH',
      'United Way Worldwide',
      'Convoy Of Hope',
      'Boys & Girls Clubs Of America',
      'Alzheimer\'s Association',
      'Shriners Children\'s',
      'Habitat for Humanity',
      'United Negro College Fund',
      'American Red Cross',
      'Planned Parenthood',
      'Young Life',
      'Boston Children\'s Hospital',
      'Feed The Children',
      'Feeding America',
      'American Heart Association',
      'Midwest Food Bank',
      'World Vision',  
  ];

  filteredCharities: string[] = [...this.charities];
     
  @ViewChild('dropdownContainer') dropdownRef!: ElementRef;
  
  @ViewChild('mobileVideo', { static: false }) mobileVideoRef!: ElementRef<HTMLVideoElement>;
  showPlayButton = true;
  
    ngAfterViewInit(): void {
      this.ensureMinimumSlides(this.sliderTrackRef.nativeElement);
      this.ensureMinimumSlides(this.planTrackRef.nativeElement);
      this.ensureMinimumSlides(this.mapTrackRef.nativeElement);
      
        this.videoRef.nativeElement.currentTime = 0;
        this.videoRef.nativeElement.muted = true;
        this.videoRef.nativeElement.load();

        this.mobileVideoRef.nativeElement.addEventListener('ended', () => {
          this.showPlayButton = true;
        });
    }
    
    
    
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
    
    
      @HostListener('window:scroll')
  onScroll(): void {
    if (this.videoPlayed) return;

    const rect = this.sectionRef.nativeElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const video = this.videoRef.nativeElement;
      video.play().then(() => {
        this.videoPlayed = true;
      }).catch(err => {
        console.warn('Autostart is blocked by the browser:', err);
      });
    }
  }
  
    toggleMute(): void {
    const video = this.videoRef.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }
  
    playMobileVideo(): void {
      const video = this.mobileVideoRef.nativeElement;
      video.currentTime = 0;
      video.play().then(() => {
        this.showPlayButton = false;
      }).catch(console.error);
    }

    pauseMobileVideo(): void {
      const video = this.mobileVideoRef.nativeElement;
      video.pause();
      this.showPlayButton = true;
    }


    selectAmount(amount: number): void {
      this.selectedAmount = amount;
      this.customAmount = amount;
    }

    onCustomInputChange(): void {
      const value = this.customAmount;

      if (!this.predefinedAmounts.includes(Number(value))) {
        this.selectedAmount = null; 
      } else {
        this.selectedAmount = Number(value); 
      }
    }
    
    filterCharities(): void {
      this.filteredCharities = this.charities.filter(c =>
        c.toLowerCase().includes(this.charitySearch.toLowerCase())
      );
      this.dropdownOpen = true;
    }

    selectCharity(charity: string): void {
      this.selectedCharity = charity;
      this.charitySearch = charity;
      this.dropdownOpen = false;
    }

    toggleDropdown(): void {
      this.dropdownOpen = !this.dropdownOpen;
    }

    openDropdown() {
      setTimeout(() => {
        this.dropdownOpen = true;
      }, 0);
    }


    closeDropdown(): void {
      setTimeout(() => {
        this.dropdownOpen = false;
      }, 150); 
    }
    
    onBlurDropdown() {
      setTimeout(() => {
        this.dropdownOpen = false;
      }, 150); 
    }
    
    @HostListener('document:click', ['$event.target'])
    onClickOutside(targetElement: HTMLElement) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(targetElement)) {
      this.closeDropdown();
    }
  }


}
