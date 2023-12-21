import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { Message } from '../models/messageFormat';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket$!: WebSocketSubject<any>
  private messagesSubject$ = new Subject<Message>();
  public messageObservable = this.messagesSubject$.asObservable();
  constructor() {

  }
  public connect(): void {
    
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      console.log("connect")
      console.log(this.socket$)
      this.socket$.subscribe(
        {next : (value) => {
          console.log(value)
          this.messagesSubject$.next(value)
        }}
      );
    }
  }
  
  private getNewWebSocket() {
    return webSocket("ws://localhost:8080");
  }
  sendMessage(msg: any) {
    console.log("send msg method")
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); 
  }
}
