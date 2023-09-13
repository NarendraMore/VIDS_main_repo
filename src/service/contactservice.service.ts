import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {

  constructor(private http: HttpClient) { }

  addContactData(data: any) {
    return this.http.post(`${environment.url}/VIDS/ContactUs`, data)
  }
}
