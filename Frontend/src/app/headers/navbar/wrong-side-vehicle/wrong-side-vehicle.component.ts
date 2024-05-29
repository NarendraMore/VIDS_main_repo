import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';

export interface wrongside {
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
  selector: 'app-wrong-side-vehicle',
  templateUrl: './wrong-side-vehicle.component.html',
  styleUrls: ['./wrong-side-vehicle.component.css'],
  providers: [DatePipe]
})
export class WrongSideVehicleComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef | undefined;
  wrongSideVideo: boolean = false;
  wrongSidePhoto: boolean = false;
  wrongsidezoomPhoto: boolean = false;
  Wrongside: any;
  wrongSideArray: wrongside[] = [];
  wrongsideId: any;
  wrongsidevideoId: any;
  endDate: any = this.formatDate(new Date());
  startDate: any = this.formatDate(new Date());
  downloadReport: boolean = false;
  downloadForm!: FormGroup;
  formate!: formateData[];
  cameraType!: cameraNames[];
  eventValue: any;
  wrongSideVideoUrl: any;
  wrongSideImageUrl: any;
  wrongSidezoomVideo: boolean = false;
  totalItems: number = 0;
  first: any = 1;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  today: any;
  dateForSearch:any
  latestEvents: any[] = [];
  applyFilter() {
    // Filter your data based on the selected date range
    if (this.startDate && this.endDate) {
      this.wrongSideArray = this.wrongSideArray.filter((item) => {
        const itemDate = new Date(item.date); // Replace 'date' with the actual date property in your data
        return itemDate >= this.startDate && itemDate <= this.endDate;
      });
    }
  }
  constructor( private eventservice: EventService,
    private eventService: EventService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
    ) {
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
  keyWord:string='';
  private inputChanged = new Subject<string>();
  ngOnInit() {
    this.loadLatestEvents();
    this.downloadForm = new FormGroup({
      event: new FormControl('Wrong_Side', [Validators.required]),
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

    this.inputChanged.pipe(debounceTime(300)).subscribe(() => {
      // Call your function here, e.g., this.searchKeyword();
      console.log('Input value changed:', this.keyWord);
      this.searchKeyword();
    });
  }

  loadLatestEvents(): void {
    let event = 'Wrong_Side';
    this.eventService
      .getLatestEventByEvent(event, this.currentPage, this.itemsPerPage)
      .subscribe((wrongSideData: any) => {
        console.log(wrongSideData, 'Wrongside Data');
        this.wrongSideArray = wrongSideData.latestEvents;
        this.Wrongside = wrongSideData;
        this.totalItems = wrongSideData.totalItems;
      });
  }
  onPageChange(event: any): void {
    console.log('onPageChange triggered:', event);
    this.currentPage = event.page + 1; // PrimeNG Paginator uses 0-based indexing
    sessionStorage.setItem('currentPage',this.currentPage)
    this.loadLatestEvents();
  }
  onClickCanclevideo() {
    // this.ngOnInit();
    this.wrongSideVideoUrl = '';
    this.wrongSideVideo = false;
  }

  searchByDate(data:any){
    console.log(data,"calender Date");
    const formattedDate = this.datePipe.transform(data, 'YYYY-MM-dd');
        
    console.log(formattedDate, "Formatted Date");
    this.eventservice.getDataBySearchonDate(formattedDate,this.currentPage, this.itemsPerPage).subscribe((data:any)=>{
    
      console.log('formate data',data);
      this.wrongSideArray = data.latestEvents;
      this.totalItems = data.totalItems;
      
     })
      }


  onClickShowwrongsidevideo(id: any, name: any) {
    this.wrongSideVideo = true;
    this.wrongSideVideoUrl = `${environment.url}/playVideo/${id}`;
    this.wrongsidevideoId = id;

    this.eventService.playVideoApi(id).subscribe(
      (data: any) => {
        console.log(data, 'wrong side video id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error.url);
        const url = error.url;
        this.wrongSideVideoUrl = url;
      }
    );
    this.reloadVideo();
  }
  reloadVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.renderer.setAttribute(this.videoPlayer.nativeElement, 'src', this.wrongSideVideoUrl);
      this.videoPlayer.nativeElement.load();
    }
    
  }
  zoomInImage() {
    this.wrongSidePhoto = false;
    this.wrongsidezoomPhoto = true;
  }
  onClickCanclePhoto() {
    this.ngOnInit();
    this.wrongSideImageUrl = '';
    window.location.reload();
    this.wrongSidePhoto = false;
  }
  onClickShowphoto(id: any) {
    this.wrongSidePhoto = true;

    // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    this.wrongsideId = id;
    this.wrongSideImageUrl = `${environment.url}/getLatestImage/${id}`;

    this.eventService.displayImage(id).subscribe(
      (data: any) => {
        console.log(data, 'wrong side id wise data');
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.wrongSideImageUrl = url;
        console.log(this.wrongSideImageUrl, 'url');
      }
    );
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
  onclickcameraEvent(event: any) {
    console.log(event.value, 'camera event value');
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
    this.downloadReport = true;
    // this.downloadForm.reset();
  }
  // onclickImage(){
  //   this.ngOnInit()
  // }

  onClickCancel() {
    this.downloadReport = false;
    this.downloadForm.reset();
    this.ngOnInit();
  }
  // excel format
  downLoad1() {
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate

    console.log(this.downloadForm.value,'excel file ');
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
    console.log('pdf file ');
    this.downloadForm.value.startDate=this.startDate;
    this.downloadForm.value.endDate=this.endDate
    
    this.eventService.downloadPdfFormate1(this.downloadForm.value).subscribe(
      (x: any) => {
        console.log(this.downloadForm.value, 'pdf data download');

        var newBlob = new Blob([x], { type: 'application/pdf' });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = 'vdsData.pdf';
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        console.log('File Downloaded Successfully');
        // this.downloadForm.reset();
        // this.ngOnInit(); // Corrected: Invoke the reset method with parentheses
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
    this.eventService.downloadPdfFormate2(this.downloadForm.value).subscribe(
      (x: any) => {
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
      }
    );
  }

  onInputChange(event: any) {
    console.log(event.target.value,"event value");
    this.keyWord=event.target.value
    // Trigger the debounced input change
    this.inputChanged.next(this.keyWord);
  }
  searchKeyword(){
    const eventType='Wrong-side'

    this.eventService.getDataBySearch(this.keyWord,this.currentPage, this.itemsPerPage,eventType).subscribe((data:any)=>{
 
     console.log(data);
     this.wrongSideArray = data.latestEvents;
     this.totalItems = data.totalItems;
     
    })
 if(this.keyWord==='')
    this.loadLatestEvents();
   }
}
