import { NgModule } from '@angular/core';
import { MvpRoutingModule } from './mvp-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { MvpState } from './store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Mvp1Component } from './pages/mvp-1/mvp-1.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { FooterComponent } from './footer/footer.component';
import { BusinessComponent } from './business/business.component';
import { NonProfitsComponent } from './non-profits/non-profits.component';
import { DonorsComponent } from './donors/donors.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoriesComponent } from './stories/stories.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

import { StrategyComponent } from './strategy/strategy.component';


@NgModule({
  declarations: [
    Mvp1Component,
    NavigationMenuComponent,
    FooterComponent,
    BusinessComponent, 
    NonProfitsComponent, 
    DonorsComponent,
    AboutUsComponent, 
    HomePageComponent, 
    StoriesComponent,
    HowItWorksComponent,
    StrategyComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MvpRoutingModule,
    NgxsModule.forFeature([MvpState]),
  ],
  exports: [MvpRoutingModule, NavigationMenuComponent],
})
export class MvpModule {}
