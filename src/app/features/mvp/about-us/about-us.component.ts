import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';

import { Meta, Title } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: any
  ) {}

  ngOnInit(): void {
    const pageTitle = 'About Us';
    const pageDescription = 'At Wishes, were building a future where trust, transparency, and technology empower nonprofits to thrive. We believe that every cause deserves the tools and visibility to grow, and every supporter deserves to know exactly how their contribution makes an impact.';

    const origin = isPlatformServer(this.platformId)
      ? `${this.request.protocol}://${this.request.get('host')}`
      : window.location.origin;

 
    const imageUrl = `${origin}/assets/images/about-us.png`; 
    const pageUrl = `${origin}/about-us`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
  }
}
