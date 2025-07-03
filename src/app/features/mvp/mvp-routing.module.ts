import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Mvp1Component } from './pages/mvp-1/mvp-1.component';
import { BusinessComponent } from './business/business.component';
import { NonProfitsComponent } from './non-profits/non-profits.component';
import { DonorsComponent } from './donors/donors.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoriesComponent } from './stories/stories.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { StrategyComponent } from './strategy/strategy.component';


const routes: Routes = [
 
{ path: 'business', component: BusinessComponent },

{ path: 'non-profits', component: NonProfitsComponent },
  
{ path: 'donors', component: DonorsComponent },
  
{ path: 'about-us', component: AboutUsComponent },

{ path: 'success-stories', component: StoriesComponent} ,

{ path: 'home', component: HomePageComponent },

{ path: 'how-it-works', component: HowItWorksComponent },

{ path: 'ai-strategy', component: StrategyComponent},



  // { path: '', component: Mvp1Component },
  { path: '', component: Mvp1Component  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MvpRoutingModule {}
