import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(data: any) {
    return this.http.post(`${environment.url}/login`, data)
  }
  machineStatus() {
    console.log('call in');
    
    return this.http.get(`${environment.url}/machinestatus`)
  }
}
