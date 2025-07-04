import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mvp-1',
  templateUrl: './mvp-1.component.html',
  styleUrls: ['./mvp-1.component.scss'],
})
export class Mvp1Component implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

}
