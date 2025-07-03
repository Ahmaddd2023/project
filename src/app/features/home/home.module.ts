import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MvpModule } from '../mvp/mvp.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, HomeRoutingModule, MvpModule, FormsModule],
  exports: [LandingComponent]
})
export class HomeModule {}
