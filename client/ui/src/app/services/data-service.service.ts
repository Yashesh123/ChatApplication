import { ElementRef, Injectable } from '@angular/core';
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
  private loadCallComponentSubject = new Subject<boolean>();
  public loadCallComponentObservable$ = this.loadCallComponentSubject.asObservable();

  rtcConfig : RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }

  connection!: RTCPeerConnection;
  
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

  private async _initConnection(remoteVideo: ElementRef): Promise<void> {
    this.connection = new RTCPeerConnection(this.rtcConfig);

    await this._getStreams(remoteVideo);

    this._registerConnectionListeners();
  }

  public async makeCall(remoteVideo: ElementRef): Promise<void> {
    this.loadCallComponentSubject.next(true);
    await this._initConnection(remoteVideo);

    const offer = await this.connection.createOffer();

    await this.connection.setLocalDescription(offer);

    this.sendMessage({ forCall: true, type: 'offer', offer });
  }

  public async handleOffer(
    offer: RTCSessionDescription,
    remoteVideo: ElementRef
  ): Promise<void> {
    await this._initConnection(remoteVideo);

    await this.connection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await this.connection.createAnswer();

    await this.connection.setLocalDescription(answer);

    this.sendMessage({ forCall: true, type: 'answer', answer });
  }

  public async handleAnswer(answer: RTCSessionDescription): Promise<void> {
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }

  public async handleCandidate(candidate: RTCIceCandidate): Promise<void> {
    if (candidate) {
      await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private _registerConnectionListeners(): void {
    this.connection.onicegatheringstatechange = (ev: Event) => {
      console.log(
        `ICE gathering state changed: ${this.connection.iceGatheringState}`
      );
    };

    this.connection.onconnectionstatechange = () => {
      console.log(
        `Connection state change: ${this.connection.connectionState}`
      );
    };

    this.connection.onsignalingstatechange = () => {
      console.log(`Signaling state change: ${this.connection.signalingState}`);
    };

    this.connection.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state change: ${this.connection.iceConnectionState}`
      );
    };
    this.connection.onicecandidate = (event) => {
      if (event.candidate) {
        const payload = {
          forCall : true,
          type: 'candidate',
          candidate: event.candidate.toJSON(),
        };
        this.sendMessage(payload);
      }
    };
  }

  private async _getStreams(remoteVideo: ElementRef): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    const remoteStream = new MediaStream();

    remoteVideo.nativeElement.srcObject = remoteStream;

    this.connection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    stream.getTracks().forEach((track) => {
      this.connection.addTrack(track, stream);
    });
  }


  close() {
    this.socket$.complete(); 
  }
}
