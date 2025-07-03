import { Action, State, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import {
  CoreStateModel,
  RegisterEmailResponse,
  VerifyEmailResponse,
} from './core-state.model';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  CreateCustomer,
  GetBotCategories,
  GetPersonalData,
  RegisterEmail,
  UpdatePersonalData,
  VerifyEmail,
} from './core.actions';
import { CoreService } from '../services/core.service';
import { CreateCustomerResponse } from '../../features/mvp/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@State<CoreStateModel>({
  name: 'core',
})
@Injectable()
export class CoreState {
  constructor(
    private coreService: CoreService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) {}
  @Action(GetBotCategories)
  getBotCategories(
    { getState, patchState }: StateContext<CoreStateModel>,
    {}: GetBotCategories,
  ): any {
    return this.coreService.getBotCategories(environment.botId).pipe(
      tap((result) => {
        if (result.status) {
          const state = getState();
          patchState({
            ...state,
            categories: result.categories,
          });
        }
      }),
      catchError((err) => {
        patchState({
          categories: undefined,
        });
        return throwError(err);
      }),
    );
  }

  @Action(CreateCustomer)
  createCustomer(
    { patchState, dispatch }: StateContext<CoreStateModel>,
    { login, password, name }: CreateCustomer,
  ): Observable<CreateCustomerResponse> {
    return this.coreService.createCustomer(login, password, name).pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            customerId: res.customer_id,
            customerToken: res.token,
          });

          localStorage.setItem('walletAuthToken', res.token);
        }
      }),
      catchError((err) => {
        this.zone.run(() => {
          this.snackBar.open(err.error.error, 'X', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        });
        patchState({
          customerId: '',
          customerToken: '',
        });
        return throwError(err);
      }),
    );
  }

  @Action(RegisterEmail)
  registerEmail(
    { patchState }: StateContext<RegisterEmailResponse>,
    { email }: RegisterEmail,
  ): Observable<any> {
    patchState({
      status: undefined,
      error: undefined,
    });
    return this.coreService.registerEmail(email).pipe(
      tap((res) => {
        if (res.status) {
          this.snackBar.open('Please check your email for verification.', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          patchState({
            status: res.status,
          });
        }
      }),
      catchError((err) => {
        patchState({
          error: err.error.error,
        });
        throw err;
      }),
    );
  }

  @Action(VerifyEmail)
  verifyEmail(
    { patchState }: StateContext<VerifyEmailResponse>,
    { hash }: VerifyEmail,
  ): Observable<any> {
    patchState({
      status: undefined,
      error: undefined,
    });
    return this.coreService.verifyEmail(hash).pipe(
      tap((res) => {
        if (res.status) {
          patchState({
            status: res.status,
          });
        }
      }),
      catchError((err) => {
        patchState({
          error: err.error.error,
        });
        throw err;
      }),
    );
  }

  @Action(GetPersonalData)
  getPersonalData(
    { patchState }: StateContext<CoreStateModel>,
    {}: GetPersonalData,
  ): Observable<any> {
    patchState({
      address: undefined,
      telephone: undefined,
      mobile: undefined,
    });
    return this.coreService.getPersonalData().pipe(
      tap((res) => {
        if (res.status && res.person.attributes) {
          patchState({
            address: res.person.attributes?.address,
            telephone: res.person.attributes?.telephone,
            mobile: res.person.attributes?.mobile,
          });
        }
      }),
    );
  }

  @Action(UpdatePersonalData)
  updatePersonalData(
    {}: StateContext<CoreStateModel>,
    { address, telephone, mobile }: UpdatePersonalData,
  ): Observable<any> {
    return this.coreService
      .updatePersonalData(address, telephone, mobile)
      .pipe();
  }
}
