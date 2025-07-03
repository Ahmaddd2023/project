import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './features/mvp/business/business.component';
import { NonProfitsComponent } from './features/mvp/non-profits/non-profits.component';
import { DonorsComponent } from './features/mvp/donors/donors.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/mvp/mvp.module').then((m) => m.MvpModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

const wishesPayRoutes: Routes = [
  { path: '', component: BusinessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
const wishesGivesRoutes: Routes = [
  { path: '', component: NonProfitsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
const wishesFundRoutes: Routes = [
  { path: '', component: DonorsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    const domain = window.location.host;
    switch (domain) {
      case 'www.wishespay.com':
        this.router.resetConfig(wishesPayRoutes);
        break;

      case 'www.wishes.gives':
        this.router.resetConfig(wishesGivesRoutes);
        break;

      case 'www.wishes.fund':
        this.router.resetConfig(wishesFundRoutes);
        break;

      // default:
      //   this.router.resetConfig(wishesPayRoutes);
      //   break;
    }
  }
}
