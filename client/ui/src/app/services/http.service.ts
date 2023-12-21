import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly baseURL = ENVIRONMENT.server_url;
  
  readonly loginURL = "/login"
  readonly registerURL = "/register";

  headers = new HttpHeaders({
    "content-type" : "application/json"
  })

  constructor(private httpClient : HttpClient) { }

  sendPostRequest(url : string, body : any){
    return this.httpClient.post(this.baseURL + url, body, {
      headers : this.headers
    })
  }

  sendGetRequest(url : string){
    return this.httpClient.get(this.baseURL + url, {
      headers : this.headers
    })
  }

  loginRequest(body : any){
    return this.sendPostRequest(this.loginURL, body)
  }

  registerRequest(body : any){
    return this.sendPostRequest(this.registerURL, body);
  }
}
