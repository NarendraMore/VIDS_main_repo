import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventService } from 'src/app/service/event.service';
// import { VgAPI } from 'ngx-videogular/core';
import 'src/assets/jsmpeg.min.js';

declare var JSMpeg: any;
@Component({
  selector: 'app-live-camera',

  templateUrl: './live-camera.component.html',
  styleUrls: ['./live-camera.component.css']
})
export class LiveCameraComponent implements OnInit, AfterViewInit {

  player: any;
  player1: any;
  player2: any;
  player3: any;
  player4: any;
  player5: any;
  player6: any;
  player7: any;
  player8: any;
  player9: any;
  player10: any;
  player11: any;
  player12: any;
  cameraUrl: any
  streamUrl: string = '';

  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl1: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl2: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl3: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl4: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl5: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl6: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl7: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl8: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl9: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl10: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl11: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  videoUrl12: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  constructor(private http: HttpClient, private eventservice: EventService,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef) {
    console.log(this.videoUrl, 'link 1');
  

    this.getCamerafirst();
    
  }
  ngOnInit(): void {

    this.fetchCameraData();
   }
   ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeJSMpegPlayer();
    }, 0);
  }
  // ngAfterViewInit(): void {
  //   // Delay initializing JSMpeg until the view is initialized
  //   setTimeout(() => {
  //     // this.initializeJSMpegPlayer();
  //   }, 0);
  // }
  // initializeJSMpegPlayer(rtspUrl: string, canvasId: string): void {
  //   const canvasElement = this.elRef.nativeElement.querySelector('#' + canvasId);
  //   const player = new JSMpeg.Player(rtspUrl, {
  //     canvas: canvasElement,
  //   });
  // }
  initializeJSMpegPlayer(): void {
    const canvasElement = this.elRef.nativeElement.querySelector('#canvas');
    const canvasElement1 = this.elRef.nativeElement.querySelector('#canvas1');
    const canvasElement2 = this.elRef.nativeElement.querySelector('#canvas2');
    const canvasElement3 = this.elRef.nativeElement.querySelector('#canvas3');
    const canvasElement4 = this.elRef.nativeElement.querySelector('#canvas4');
    const canvasElement5 = this.elRef.nativeElement.querySelector('#canvas5');
    const canvasElement6 = this.elRef.nativeElement.querySelector('#canvas6');
    const canvasElement7 = this.elRef.nativeElement.querySelector('#canvas7');
    const canvasElement8 = this.elRef.nativeElement.querySelector('#canvas8');
    const canvasElement9 = this.elRef.nativeElement.querySelector('#canvas9');
    const canvasElement10 = this.elRef.nativeElement.querySelector('#canvas10');
    const canvasElement11 = this.elRef.nativeElement.querySelector('#canvas11');
    const canvasElement12 = this.elRef.nativeElement.querySelector('#canvas12');
   
    const rtspUrl = 'ws://localhost:8081';
    const rtspUrl1 = 'ws://localhost:8082';
    const rtspUrl2 = 'ws://localhost:8083';
    const rtspUrl3 = 'ws://localhost:8084';
    const rtspUrl4 = 'ws://localhost:8085';
    const rtspUrl5 = 'ws://localhost:8086';
    const rtspUrl6 = 'ws://localhost:8087';
    const rtspUrl7 = 'ws://localhost:8088';
    const rtspUrl8 = 'ws://localhost:8089';
    const rtspUrl9 = 'ws://localhost:8090';
    const rtspUrl10 = 'ws://localhost:8091';
    const rtspUrl11 = 'ws://localhost:8092';
    const rtspUrl12 = 'ws://localhost:8093';
    
   
    
    
    // Create the JSMpeg player
    this.player = new JSMpeg.Player(rtspUrl, {
      canvas: canvasElement,
    });
    // console.log('this.player',this.player);
    
    this.player1 = new JSMpeg.Player(rtspUrl1, {
      canvas: canvasElement1,
    });
    this.player2 = new JSMpeg.Player(rtspUrl2, {
      canvas: canvasElement2,
    });

    this.player3 = new JSMpeg.Player(rtspUrl3, {
      canvas: canvasElement3,
    });
    this.player4 = new JSMpeg.Player(rtspUrl4, {
      canvas: canvasElement4,
    });
    this.player5 = new JSMpeg.Player(rtspUrl5, {
      canvas: canvasElement5,
    });
    this.player6 = new JSMpeg.Player(rtspUrl6, {
      canvas: canvasElement6,
    });
    this.player7 = new JSMpeg.Player(rtspUrl7, {
      canvas: canvasElement7,
    });
    this.player8 = new JSMpeg.Player(rtspUrl8, {
      canvas: canvasElement8,
    });
    this.player9 = new JSMpeg.Player(rtspUrl9, {
      canvas: canvasElement9,
    });
    this.player10 = new JSMpeg.Player(rtspUrl10, {
      canvas: canvasElement10,
    });
    this.player11 = new JSMpeg.Player(rtspUrl11, {
      canvas: canvasElement11,
    });
    this.player12 = new JSMpeg.Player(rtspUrl12, {
      canvas: canvasElement12,
    });
  }
  cameras: any[] = [];
  fetchCameraData(): void {
    // Call your backend API to fetch camera data
    this.eventservice.fetchCamera().subscribe(
      (data: any) => {
        this.cameras = data;
        // this.setupCameras();
      },
      (error) => {
        console.error('Error fetching camera data', error);
      }
    );
  }
  // setupCameras(): void {
  //   this.cameras.forEach((camera) => {
  //     const rtspUrl = camera.stream;
  //     const canvasId = `canvas${camera._id}`;
  //     this.initializeJSMpegPlayer(rtspUrl, canvasId);
  //   });
  // }

  getCamerafirst() {
    // this.eventservice.getLiveCameraLUrl().subscribe(
    //   (data: any) => {
    //     console.log(data, 'first camera');
    //     // If you intend to use the data, assign it to this.cameraUrl here.
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error:', error);
    //     const url = error.url;
    //     this.cameraUrl = url;
    //     console.log(this.cameraUrl, 'url');
    //   }
    // );

    
  }
}