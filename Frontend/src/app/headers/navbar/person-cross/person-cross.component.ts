import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/event.service';
import { environment } from 'src/environments/environment';

export interface personCross {
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
  selector: 'app-person-cross',
  templateUrl: './person-cross.component.html',
  styleUrls: ['./person-cross.component.css'],
  providers: [DatePipe]
})
export class PersonCrossComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef | undefined;
  downloadReport: boolean = false;
  personCrossVideo: boolean = false;
  personCrossPhoto: boolean = false;
  personCrosszoomPhoto: boolean = false;
  personCrossArray: personCross[] = [];
  endDate: string = this.formatDate(new Date());
  startDate: string = this.formatDate(new Date());
  downloadForm!: FormGroup;
  formate!: formateData[];
  eventValue: any;
  personCrossVideoId: any;
  personCrossImageId: any;

  cameraType!: cameraNames[];
  personcrossImageUrl: any;
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
  }
  ngOnInit() {
    this.loadLatestEvents();
    this.downloadForm = new FormGroup({
      event: new FormControl('Personcross', [Validators.required]),
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
    const event = 'Personcross';
    this.eventService
      .getLatestEventByEvent(event, this.currentPage, this.itemsPerPage)
      .subscribe((personCrossData: any) => {
        console.log(personCrossData, 'person cross data');
        this.personCrossArray = personCrossData.latestEvents;
        this.totalItems = personCrossData.totalItems;
      });
  }

  searchByDate(data: any) {
    console.log(data, "calender Date");
    const formattedDate = this.datePipe.transform(data, "YYYY-MM-dd");

    console.log(formattedDate, "Formatted Date");
    this.eventservice
      .getDataBySearchonDate(formattedDate, this.currentPage, this.itemsPerPage)
      .subscribe((data: any) => {
        console.log("formate data", data);
        this.personCrossArray = data.latestEvents;
        this.totalItems = data.totalItems;
      });
  }
  onPageChange(event: any): void {
    console.log('onPageChange triggered:', event);
    this.currentPage = event.page + 1; // PrimeNG Paginator uses 0-based indexing
    sessionStorage.setItem('currentPage',this.currentPage)
    this.loadLatestEvents();
  }
  onclickDownloadReport() {
    this.downloadReport = true;
  }
  personCrossUrl: any;
  onClickShowvideo(id: any) {
    this.personCrossVideo=true;
    this.personCrossUrl = `${environment.url}/playVideo/${id}`;
    this.reloadVideo();
  }
  reloadVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.renderer.setAttribute(this.videoPlayer.nativeElement, 'src', this.personCrossUrl);
      this.videoPlayer.nativeElement.load();
    }
    
  }
  onClickCanclevideo() {
    this.personCrossUrl = '';
    this.personCrossVideo = false;
  }
  onClickCanclePhoto() {
    this.ngOnInit();
    this.personcrossImageUrl = '';
    window.location.reload();
    this.personCrossPhoto = false;
  }
  onClickShowphoto(id: any, name: any) {
    this.personCrossPhoto = true;
    this.personCrossImageId = id;
    this.personcrossImageUrl = `${environment.url}/getLatestImage/${id}`;
    this.eventService.displayImage(this.personCrossImageId).subscribe(
      (data: any) => {
        console.log(data, 'person cross id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.personcrossImageUrl = url;
        console.log(this.personcrossImageUrl, 'url');
      }
    );
  }
  zoomInImage() {
    this.personCrossPhoto = false;
    this.personCrosszoomPhoto = true;
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
    // this.downloadForm.reset()();
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

    this.eventService.downloadPdfFormate1(this.downloadForm.value).subscribe(
      (x: any) => {
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
      }
    );
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
