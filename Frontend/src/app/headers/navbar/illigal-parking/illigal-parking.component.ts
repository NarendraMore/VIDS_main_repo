import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/event.service';
import { environment } from 'src/environments/environment';

export interface illigalParking {
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
  selector: 'app-illigal-parking',
  templateUrl: './illigal-parking.component.html',
  styleUrls: ['./illigal-parking.component.css'],
  providers: [DatePipe]
})
export class IlligalParkingComponent {
  
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef | undefined;
  illigalArray: illigalParking[] = [];
  downloadReport: boolean = false;
  formate!: formateData[];
  cameraType!: cameraNames[];
  downloadForm!: FormGroup;
  illigalParkingVideo: boolean = false;
  illigalParkingId: any;
  illigalParkingvideoId: any;
  illigalParkingvideoUrl: any;
  illigalParkingPhoto: boolean = false;
  illigalParkingImageUrl: any;
  endDate: string = this.formatDate(new Date());
  startDate: string = this.formatDate(new Date());
  eventValue: any;
  IllegalParkingzoomPhoto: boolean = false;
  totalItems: number = 0;
  first: any = 1;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  today: any;
  dateForSearch:any
  constructor(private eventService: EventService,
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

    // console.log(this.formate, 'jhgugjkhk');
  }
  ngOnInit() {
    this.loadLatestEvents();
    this.downloadForm = new FormGroup({
      event: new FormControl('Illegal_Parking', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      formate: new FormControl('', [Validators.required]),
      cameratype: new FormControl('', [Validators.required]),
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
  }

  loadLatestEvents(): void {
    const event = 'Illegal_Parking';
    this.eventService
      .getLatestEventByEvent(event, this.currentPage, this.itemsPerPage)
      .subscribe((illegaldata: any) => {
        console.log(illegaldata, 'illegalData');
        this.illigalArray = illegaldata.latestEvents;
        this.totalItems = illegaldata.totalItems;
      });
  }
  keyWord:string='';
  formattedDate:any
  onPageChange(event: any): void {
    console.log('onPageChange triggered:', event);
    this.currentPage = event.page + 1; // PrimeNG Paginator uses 0-based indexing
    sessionStorage.setItem('currentPage',this.currentPage)
    if (
      (this.keyWord == "" || this.keyWord == undefined) &&
      this.dateForSearch == null
    ) {
      this.loadLatestEvents();
    } else {
      let event = "Illegal_Parking";
      this.eventservice
        .getDataBySearchonDate1(
          event,
          this.formattedDate,
          sessionStorage.getItem("currentPage"),
          this.itemsPerPage
        )
        .subscribe((data: any) => {
          console.log(data);
          this.illigalArray = data.latestEvents;
          this.totalItems = data.totalItems;
        });
    }
  }
  onclickDownloadReport() {
    this.downloadReport = true;
  }

  searchByDate(data: any) {
    console.log(data, "calender Date");
    this.formattedDate = this.datePipe.transform(data, "YYYY-MM-dd");
    let event = "Illegal_Parking";
    console.log(this.formattedDate, "Formatted Date");
    this.eventservice
      .getDataBySearchonDate1(
        event,
        this.formattedDate,
        sessionStorage.getItem("currentPage"),
        this.itemsPerPage
      )
      .subscribe((data: any) => {
        console.log("formate data", data);
        this.illigalArray = data.latestEvents;
        this.totalItems = data.totalItems;
      });
  }
  onClickCanclevideo() {
    this.illigalParkingvideoUrl = '';
    this.illigalParkingVideo = false;
  }
  onClickShowvideo(id: any, name: any) {
    this.illigalParkingVideo = true;
    this.illigalParkingvideoId = id;
    this.illigalParkingvideoUrl = `${environment.url}/playVideo/${id}`;
    this.eventService.playVideoApi(id).subscribe(
      (data: any) => {
        console.log(data, 'illigal Parking video id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.illigalParkingvideoUrl = url;
        console.log(this.illigalParkingvideoUrl, 'url');
      }
    );
    this.reloadVideo();
  }
  reloadVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.renderer.setAttribute(this.videoPlayer.nativeElement, 'src', this.illigalParkingvideoUrl);
      this.videoPlayer.nativeElement.load();
    }
    
  }
  zoomInImage() {
    this.IllegalParkingzoomPhoto = true;
    this.illigalParkingPhoto = false;
  }

  onClickCanclePhoto() {
    this.illigalParkingImageUrl = '';
    this.ngOnInit();
    window.location.reload();
    this.illigalParkingPhoto = false;
  }
  onClickShowphoto(id: any, name: any) {
    this.illigalParkingPhoto = true;

    // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    this.illigalParkingId = id;
    this.illigalParkingImageUrl = `${environment.url}/getLatestImage/${id}`;
    this.eventService.displayImage(id).subscribe(
      (data: any) => {
        console.log(data, 'wrong side id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.illigalParkingImageUrl = url;
        console.log(this.illigalParkingImageUrl, 'url');
      }
    );
  }
  onDropdownChange(event: any) {
    this.eventValue = event.value;
    console.log(this.eventValue, 'event value');
  }
  onclickcameraEvent(event: any) {
    console.log(event.value, 'camera event value');
  }
  onClickCancel() {
    this.downloadReport = false;
    this.downloadForm.reset();
    this.ngOnInit();
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
  onClickDownloadReport() {
    // if (this.downloadForm.valid) {
    //   console.log(this.downloadForm.value, 'download payload');

    // }
    if (this.eventValue == 'Excel') {
      this.downLoad1();
    } else if (this.eventValue == 'PDF') {
      this.downLoad2();
    } else if (this.eventValue == 'CSV') {
      this.downLoad3();
    }
    this.downloadReport = false;
    this.downloadForm.reset();
  }
  downLoad1() {
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate
    console.log('excel file ');
    this.eventService.downloadPdfFormate(this.downloadForm.value).subscribe(
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
        // console.log(data,'download file');
        this.downloadForm.reset();
        this.ngOnInit();
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

    this.eventService
      .downloadPdfFormate1(this.downloadForm.value)
      .subscribe((x: any) => {
        console.log(this.downloadForm.value, 'pdf data  download');

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
        // console.log(data,'download file');
        this.ngOnInit();
        this.downloadForm.reset();
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
    this.eventService
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
        // console.log(data,'download file');
        this.downloadForm.reset();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error);
      });
  }
}
