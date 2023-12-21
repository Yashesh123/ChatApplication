import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap, } from 'rxjs';
import { Message } from 'src/app/models/messageFormat';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  liveData$!: Observable<any>; 
  message:any;
  rd : Message[] = []
  inputMessage = ""
  userName = "";

  constructor(
      private dataService: DataService
    ){
      this.dataService.connect();
      const storageValue = sessionStorage.getItem("name");
      this.userName = storageValue!=null ? storageValue : "User";
  }
  
  ngOnInit(): void {
    this.dataService.messageObservable
      .subscribe((data:Message)=>{
        console.log(data)
        data = {
          ...data,
          sendTime : new Date(data.sendTime),
          myMessage: data.userName === this.userName ? true : false
        };
        this.rd.push(data);
      }),
      catchError(error => { throw error}),
      tap({
        error: error => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      })
  }

  sendMessage(event:any = undefined){
    this.message = {
      userName : this.userName,
      messageString : event.message
    };
    console.log( this.message)
    this.dataService.sendMessage(this.message)
  }
}
