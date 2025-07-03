import { Component } from '@angular/core';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent {
  activeStep: number = 1;
  expandedStates: boolean[] = [false, false, false, false, false, false, false, false, false];

 
    toggleCard(index: number): void {
      this.expandedStates = this.expandedStates.map((expanded, i) =>
        i === index ? !expanded : false
      );
    }

    setStep(step: number): void {
        this.activeStep = step;
    }
}
