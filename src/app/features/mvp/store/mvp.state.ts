import { Action, State, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';

import {
  MvpStateModel} from './mvp-state.model';
import { MvpService } from '../services/mvp.service';
import { Router } from '@angular/router';
import {ChangeMessageStatus, ContactUs} from "./mvp.actions";
import {catchError, tap, throwError} from "rxjs";

@State<MvpStateModel>({
  name: 'mvp',
})
@Injectable()
export class MvpState {
  constructor(
    private mvpService: MvpService,
    private zone: NgZone,
    private router: Router,
  ) {}



  @Action(ContactUs)
  createDocumentProduct(
    { patchState, getState }: StateContext<MvpStateModel>,
    { email, name, message }: ContactUs,
  ): any {
    patchState({
      status: false,
    });
    return this.mvpService.contactUs(name, message, email).pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            status: res.status
          });
        }
      }),
      catchError((err) => {
        patchState({
          status: false,
        });
        return throwError(err);
      }),
    );
  }

   @Action(ChangeMessageStatus)
    setCurrentForm(
      { patchState }: StateContext<MvpStateModel>,
      {  }: ChangeMessageStatus,
    ): any {
      patchState({
        status: false,
      });
    }
}
