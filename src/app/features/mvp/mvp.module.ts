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
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    Mvp1Component,
    NavigationMenuComponent,
    FooterComponent,
    HomePageComponent, 
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
