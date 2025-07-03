import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  menuOpen = false;
  currentPageTitle = '';
  isDisabled = true;
  @Input() type: string = 'default';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setTitle(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setTitle(event.urlAfterRedirects);
        this.menuOpen = false;
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  closeMenu() {
    this.menuOpen = false;
  }

  setTitle(url: string) {
    const map: { [key: string]: string } = {
      '/home': 'Home',
      '/about-us': 'About us',
      '/business': 'Wishes Pay',
      '/non-profits': 'Wishes Gives',
      '/donors': 'Wishes Fund',
      '/how-it-works': 'How it works',
      '/success-stories': 'Success stories',
      '/concert': 'Wishes Concert',
      '/ai-strategy': 'AI Strategy',
    };

    this.currentPageTitle = map[url] || '';
  }

  goToDomain(domain: string, path: string): void {
    if (
      domain === 'wishespay.com' ||
      domain === 'wishes.gives' ||
      domain === 'wishes.fund'
    ) {
      window.location.href = `https://${domain}`;
      return;
    } else if (this.router.config.length > 2) {
      this.router.navigateByUrl(path);
      return;
    } else {
      window.location.href = `https://${domain}${path}`;
    }
  }
}
