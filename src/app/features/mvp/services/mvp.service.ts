import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MvpService {

  constructor(private http: HttpClient) {}


  contactUs(
    name: string,
    message: string,
    email: string
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/contact`,
      {
        name,
        message,
        email
      },{
        headers: {
          'portal-id': 'RYGK019SCZ'
        }
      }

    );
  }
  
  saveFormData(payload: any): Observable<any> {
  return this.http.post<any>(
    `${environment.apiUrl}/item/public`,
    payload,
    {
      headers: {
        'portal-id': 'RYGK019SCZ',
      },
    }
  );
}


}
