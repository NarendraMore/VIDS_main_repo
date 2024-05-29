import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/event.service';
import { environment } from 'src/environments/environment';

export interface Fogwarming {
  vehiclecount: string;
  vehicletype: string;
  date: string;
  time: string;
  cameratype: string;
  location: string;
}
export interface formateData {
  formates: string;
}
export interface cameraNames {
  cameraTypes: string;
}
@Component({
  selector: 'app-fog-warning',
  templateUrl: './fog-warning.component.html',
  styleUrls: ['./fog-warning.component.css'],
  providers: [DatePipe]
})
export class FogWarningComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef | undefined;
  Fogwarning: any;
  fogWarmingArray: Fogwarming[] = [];
  fogPhoto: boolean = false;
  fogVideo: boolean = false;
  fogzoomPhoto: boolean = false;
  endDate: string = this.formatDate(new Date());
  startDate: string = this.formatDate(new Date());
  downloadReport: boolean = false;
  downloadForm!: FormGroup;
  formate!: formateData[];
  eventValue: any;
  cameraType!: cameraNames[];
  fogVideoUrl: any;
  fogImageUrl: any;
  totalItems: number = 0;
  first: any = 1;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  today: any;
  dateForSearch:any
  constructor( private evenservice: EventService,
    private eventservice: EventService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2) {
    this.formate = [
      { formates: 'PDF' },
      { formates: 'CSV' },
      { formates: 'Excel' },
    ];
    this.cameraType = [
      { cameraTypes: 'All camera' },
      { cameraTypes: '73-Honeywell' },
      { cameraTypes: '76-Honeywell' },
      { cameraTypes: '77-Honeywell' },
      { cameraTypes: '139-Hikvision' },
      { cameraTypes: '157-Hikvision' },
      { cameraTypes: '158-Hikvision' },
    ];
  }

  ngOnInit() {
    this.loadLatestEvents();
    this.downloadForm = new FormGroup({
      event: new FormControl('Fog_Detection', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      formate: new FormControl('', [Validators.required]),
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
  }

  loadLatestEvents(): void {
    const event = 'Fog_Detection';
    this.eventservice
      .getLatestEventByEvent(event, this.currentPage, this.itemsPerPage)
      .subscribe((fogWarningData: any) => {
        console.log(fogWarningData, 'fogWarningData');

        this.fogWarmingArray = fogWarningData.latestEvents;
        this.totalItems = fogWarningData.totalItems;
      });
  }

  onPageChange(event: any): void {
    console.log('onPageChange triggered:', event);
    this.currentPage = event.page + 1; 
    sessionStorage.setItem('currentPage',this.currentPage)
    this.loadLatestEvents();
  }


  searchByDate(data: any) {
    console.log(data, "calender Date");
    const formattedDate = this.datePipe.transform(data, "YYYY-MM-dd");

    console.log(formattedDate, "Formatted Date");
    this.eventservice
      .getDataBySearchonDate(formattedDate, this.currentPage, this.itemsPerPage)
      .subscribe((data: any) => {
        console.log("formate data", data);
        this.fogWarmingArray = data.latestEvents;
        this.totalItems = data.totalItems;
      });
  }
  onClickCanclevideo() {
    this.fogVideo = false;
    this.fogVideoUrl = '';
  }
  onClickfogVideo(id: any) {
    this.fogVideo = true;

    this.fogVideoUrl = `${environment.url}/playVideo/${id}`;
    this.eventservice.playVideoApi(id).subscribe(
      (fogvideodata: any) => {
        console.log(fogvideodata, 'fog video id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.fogVideoUrl = url;
        console.log(this.fogVideoUrl, 'url');
      }
    );
    this.reloadVideo();
  }

  reloadVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.renderer.setAttribute(this.videoPlayer.nativeElement, 'src', this.fogVideoUrl);
      this.videoPlayer.nativeElement.load();
    }
    
  }
  onClickCanclePhoto() {
    this.fogPhoto = false;
    window.location.reload();
    this.fogImageUrl = '';
    this.ngOnInit();
  }
  onClickfogPhoto(id: any) {
    this.fogPhoto = true;
    this.fogImageUrl = `${environment.url}/getLatestImage/${id}`;

    this.eventservice.displayImage(id).subscribe(
      (fogimagedata: any) => {
        console.log(fogimagedata, 'fog image id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.fogImageUrl = url;
        console.log(this.fogImageUrl, 'url');
      }
    );
  }
  zoomInImage() {
    this.fogzoomPhoto = true;
    this.fogPhoto = false;
  }
  onDateChange(event: any) {
    const selectedDate: Date = event.target.valueAsDate;

    if (selectedDate) {
      this.endDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  onDateChange1(event: any) {
    const selectedDate: Date = event.target.valueAsDate;

    if (selectedDate) {
      this.startDate = this.formatDate(selectedDate);
    }
  }
  formatDate1(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  onclickDownloadReport() {
    this.downloadReport = true;
  }

  onDropdownChange(event: any) {
    this.eventValue = event.value;
    console.log(this.eventValue, 'event value');
  }
  onClickDownloadReport() {
    // if (this.downloadForm.valid) {
    //   // console.log(this.downloadForm.value, 'download payload');

    // }
    if (this.eventValue == 'Excel') {
      this.downLoad1();
    } else if (this.eventValue == 'Pdf') {
      this.downLoad2();
    } else if (this.eventValue == 'Csv') {
      this.downLoad3();
    }
    this.downloadReport = false;
  }

  onClickCancel() {
    this.downloadReport = false;
    this.downloadForm.reset();
    this.ngOnInit();
  }
  // excel format
  downLoad1() {
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate
    console.log('excel file ');
    this.eventservice.downloadPdfFormate(this.downloadForm.value).subscribe(
      (x: any) => {
        var newBlob = new Blob([x], { type: 'application/vnd.ms-excel' });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = 'Vids Report.xlsx';
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log('file Downloded');
        this.ngOnInit();
        // console.log(data,'download file');
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );
  }
  //pdf formate
  downLoad2() {
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate
    console.log('pdf file ');

    this.eventservice
      .downloadPdfFormate1(this.downloadForm.value)
      .subscribe((x: any) => {
        var newBlob = new Blob([x], { type: 'application/pdf' });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = 'vds Data.pdf';
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log('file Downloded');
        this.ngOnInit();
        // console.log(data,'download file');
      },
      (error: HttpErrorResponse) => {
        alert(error);
      });
  }
  downLoad3() {
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate
    console.log('csv file ');
    // csv formate
    this.eventservice
      .downloadPdfFormate2(this.downloadForm.value)
      .subscribe((x: any) => {
        var newBlob = new Blob([x], { type: 'text/csv' });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = 'vds Data.csv';
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log('file Downloded');
        this.ngOnInit();
        // console.log(data,'download file');
      },
      (error: HttpErrorResponse) => {
        alert(error);
      });
  }
}
