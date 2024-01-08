import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('remoteVideo')
  remoteVideo!: ElementRef;

  constructor(
      private dataService: DataService
    ){
      this.dataService.connect();
      const storageValue = sessionStorage.getItem("name");
      this.userName = storageValue!=null ? storageValue : "User";
  }
  
  ngOnInit(): void {
    this.dataService.messageObservable
      .subscribe((data:any)=>{
        console.log(data)
        if(data.forCall){
          this.handleCall(data);
        } else {
          data = {
            ...data,
            sendTime : new Date(data.sendTime),
            myMessage: data.userName === this.userName ? true : false
          };
          this.rd.push(data);
        }
        
      }),
      catchError(error => { throw error}),
      tap({
        error: error => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      })
  }

  sendMessage(event:any = undefined){
    this.message = {
      forCall : false,
      userName : this.userName,
      messageString : event.message
    };
    console.log( this.message)
    this.dataService.sendMessage(this.message)
  }

  async makeCall(){
    await this.dataService.makeCall(this.remoteVideo);
  }

  async handleCall(data:any) : Promise<void>{
    switch (data.type){
      case "offer":
        await this.dataService.handleOffer(data.offer, this.remoteVideo);
        break;

      case 'answer':
        await this.dataService.handleAnswer(data.answer);
        break;

      case 'candidate':
        this.dataService.handleCandidate(data.candidate);
        break;

      default:
        break;
    }
  }
}
