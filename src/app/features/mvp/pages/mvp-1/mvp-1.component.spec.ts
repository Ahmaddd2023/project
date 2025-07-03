import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mvp1Component } from './mvp-1.component';

describe('Mvp1Component', () => {
  let component: Mvp1Component;
  let fixture: ComponentFixture<Mvp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mvp1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Mvp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
