import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService {
  private baseUrl = 'https://api.brn.ai';

  constructor(private http: HttpClient) {}

createCustomer(botId: string, name: string, email: string): Observable<any> {
  const payload = {
    login: this.generateRandomString(),
    password: this.generateRandomString(),
    profile: {
      name: name,
      email: email
    }
  };

  return this.http.post(`${this.baseUrl}/customer/create/${botId}`, payload);
  
  console.log('Payload:', payload);

}



  sendOtp(botId: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/person/otp`, {
      email,
      bot_id: botId,
      entity: 'customer'
    });
  }

  verifyOtp(botId: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/login/${botId}`, {
      one_time_password: code
    });
  }

  addToMailList(botId: string, name: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tool/${botId}/email-list/add`, {
      name,
      email
    });
  }

  private generateRandomString(length: number = 10): string {
    return Math.random().toString(36).slice(2, 2 + length);
  }
}
