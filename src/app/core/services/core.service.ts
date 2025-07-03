import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  GetPersonalDataResponse,
  RegisterEmailResponse,
  UpdatePersonalDataRequest,
  VerifyEmailResponse,
} from '../store';
import {CreateCustomerResponse} from "../../features/mvp/store";

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  getBotCategories(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/categories/' + id);
  }

  createCustomer(
    login: string,
    password: string,
    name: string,
  ): Observable<CreateCustomerResponse> {
    return this.http.post<CreateCustomerResponse>(
      `${environment.apiUrl}/customer/create/${environment.botId}`,
      {
        login: login,
        password: password,
        profile: {
          name,
        },
      },
    );
  }

  registerEmail(email: string): Observable<RegisterEmailResponse> {
    const token = localStorage.getItem('walletAuthToken');

    return this.http.post<RegisterEmailResponse>(
      `${environment.apiUrl}/person/email`,
      { email },
      {
        headers: {
          'X-Access-Token': token || '',
        },
      },
    );
  }

  verifyEmail(hash: string): Observable<VerifyEmailResponse> {
    const apiUrl = environment.apiUrl;
    return this.http.post<VerifyEmailResponse>(
      `${apiUrl}/person/email/verify`,
      { hash },
    );
  }

  getPersonalData(): Observable<GetPersonalDataResponse> {
    const token = localStorage.getItem('walletAuthToken');

    return this.http.get<GetPersonalDataResponse>(
      `${environment.apiUrl}/person/me`,
      {
        headers: {
          'X-Access-Token': token || '',
        },
      },
    );
  }

  updatePersonalData(
    address: string,
    telephone: string,
    mobile: string,
  ): Observable<UpdatePersonalDataRequest> {
    const token = localStorage.getItem('walletAuthToken');

    return this.http.put<UpdatePersonalDataRequest>(
      `${environment.apiUrl}/person/me`,
      {
        attributes: {
          address: address,
          telephone: telephone,
          mobile: mobile,
        },
      },
      {
        headers: {
          'X-Access-Token': token || '',
        },
      },
    );
  }
}
