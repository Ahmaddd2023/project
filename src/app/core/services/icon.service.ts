import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconService {
  icons: { url: string; name: string }[] = [
    {
      url: '/assets/images/icons/back-icon-expose.svg',
      name: 'back-icon-expose',
    },
    { url: '/assets/images/icons/app-icon.svg', name: 'dashboard-icon' },
    { url: '/assets/images/icons/book-icon.svg', name: 'kontakte-icon' },
    { url: '/assets/images/icons/home-icon.svg', name: 'immobilien-icon' },
    { url: '/assets/images/icons/mail-icon.svg', name: 'mail-icon' },
    { url: '/assets/images/icons/calendar-icon.svg', name: 'calendar-icon' },
    { url: '/assets/images/icons/dashboard.svg', name: 'dashboard' },
    { url: '/assets/images/icons/plus-icon.svg', name: 'plus-icon' },
    { url: '/assets/images/icons/chat-icon.svg', name: 'chat-icon' },
    { url: '/assets/images/icons/settings-icon.svg', name: 'settings-icon' },

    {
      url: '/assets/images/icons/plus-image-icon.svg',
      name: 'plus-image-icon',
    },
    {
      url: '/assets/images/icons/arrow-right-icon.svg',
      name: 'arrow-right-icon',
    },
    { url: '/assets/images/icons/edit-icon.svg', name: 'edit-icon' },
    { url: '/assets/images/icons/close-icone.svg', name: 'close' },
    { url: '/assets/images/icons/select.svg', name: 'select' },
    { url: '/assets/images/icons/calendar.svg', name: 'calendar' },
    { url: '/assets/images/icons/address.svg', name: 'address' },
    {
      url: '/assets/images/icons/close-contact-person.svg',
      name: 'close-contact-person',
    },
    { url: '/assets/images/icons/arrow.svg', name: 'button-arrow' },
    { url: '/assets/images/icons/update-image.svg', name: 'update-image' },
    { url: '/assets/images/icons/delete-image.svg', name: 'delete-image' },
    { url: '/assets/images/icons/lightbulb-icon.svg', name: 'lightbulb-icon' },
    { url: '/assets/images/icons/upload-icon.svg', name: 'upload-icon' },
    { url: '/assets/images/icons/menu-icon.svg', name: 'menu-icon' },
    { url: '/assets/images/icons/back.svg', name: 'back-icon' },
    { url: '/assets/images/icons/save-icon.svg', name: 'save-icon' },
    { url: '/assets/images/icons/download-icon.svg', name: 'download-icon' },
    { url: '/assets/images/icons/price.svg', name: 'currency' },
    { url: '/assets/images/icons/m-2.svg', name: 'm-2' },
    { url: '/assets/images/icons/kwh.svg', name: 'kwh' },
    { url: '/assets/images/icons/show-password.svg', name: 'show-password' },
    { url: '/assets/images/icons/eye-off.svg', name: 'password-off' },
    { url: '/assets/images/icons/error-icon.svg', name: 'error-icon' },
    { url: '/assets/images/icons/back.svg', name: 'back' },
    { url: '/assets/images/icons/error.svg', name: 'error' },
    { url: '/assets/images/icons/check-icon.svg', name: 'check-icon' },
    { url: '/assets/images/icons/rooms-icon.svg', name: 'rooms-icon' },
    { url: '/assets/images/icons/undo-icon.svg', name: 'undo-icon' },
    { url: '/assets/images/icons/redo-icon.svg', name: 'redo-icon' },
    { url: '/assets/images/icons/chevron-left.svg', name: 'chevron-left' },
    { url: '/assets/images/icons/chevron-right.svg', name: 'chevron-right' },
    { url: '/assets/images/icons/refresh-icon.svg', name: 'refresh-icon' },
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icons) =>
      this.iconRegistry.addSvgIcon(
        icons.name,
        sanitizer.bypassSecurityTrustResourceUrl(icons.url),
      ),
    );
  }
}
