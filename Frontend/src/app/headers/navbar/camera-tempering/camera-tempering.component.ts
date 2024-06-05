import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { Renderer2 } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EventService } from "src/app/service/event.service";
import { environment } from "src/environments/environment";

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
  selector: "app-camera-tempering",
  templateUrl: "./camera-tempering.component.html",
  styleUrls: ["./camera-tempering.component.css"],
  providers: [DatePipe]
})
export class CameraTemperingComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef | undefined;
  wrongSideVideo: boolean = false;
  temperingPhoto: boolean = false;
  Wrongside: any;
  cameraTemperingArray: wrongside[] = [];
  temperingId: any;
  temperingvideoId: any;
  endDate: any = this.formatDate(new Date());
  startDate: any = this.formatDate(new Date());
  downloadReport: boolean = false;
  downloadForm!: FormGroup;
  formate!: formateData[];
  cameraType!: cameraNames[];
  eventValue: any;
  wrongSideVideoUrl: any;
  temperingImageUrl: any;
  temperingzoomPhoto: boolean = false;
  totalItems: number = 0;
  first: any = 1;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  today: any;
  dateForSearch:any
  applyFilter() {
    // Filter your data based on the selected date range
    if (this.startDate && this.endDate) {
      this.cameraTemperingArray = this.cameraTemperingArray.filter((item) => {
        const itemDate = new Date(item.date); // Replace 'date' with the actual date property in your data
        return itemDate >= this.startDate && itemDate <= this.endDate;
      });
    }
  }
  constructor(
    private eventService: EventService,
    private eventservice: EventService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.formate = [
      { formates: "PDF" },
      { formates: "CSV" },
      { formates: "Excel" },
    ];
    this.cameraType = [
      { cameraTypes: "All camera" },
      { cameraTypes: "73-Honeywell" },
      { cameraTypes: "76-Honeywell" },
      { cameraTypes: "77-Honeywell" },
      { cameraTypes: "139-Hikvision" },
      { cameraTypes: "157-Hikvision" },
      { cameraTypes: "158-Hikvision" },
    ];

    // console.log(this.formate, 'jhgugjkhk');
  }

  ngOnInit() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    this.today = `${year}-${month}-${day}`;

    this.loadLatestEvents();
    this.downloadForm = new FormGroup({
      event: new FormControl("Camera Tampering", [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
      endTime: new FormControl("", [Validators.required]),
      formate: new FormControl("", [Validators.required]),
      cameratype: new FormControl("", [Validators.required]),
    });
  }

  loadLatestEvents(): void {
    const event = "Camera_Tampering";
    this.eventService
      .getLatestEventByEvent(event, this.currentPage, this.itemsPerPage)
      .subscribe((wrongSideData: any) => {
        console.log(wrongSideData, "Wrongside Data");
        this.cameraTemperingArray = wrongSideData.latestEvents;
        this.Wrongside = wrongSideData;
        this.totalItems = wrongSideData.totalItems;
      });
  }
  keyWord:string='';
  formattedDate:any
  onPageChange(event: any): void {
    console.log("onPageChange triggered:", event);
    this.currentPage = event.page + 1;
    sessionStorage.setItem('currentPage',this.currentPage)
    if (
      (this.keyWord == "" || this.keyWord == undefined) &&
      this.dateForSearch == null
    ) {
      this.loadLatestEvents();
    } else {
      let event = "Camera_Tampering";
      this.eventservice
        .getDataBySearchonDate1(
          event,
          this.formattedDate,
          sessionStorage.getItem("currentPage"),
          this.itemsPerPage
        )
        .subscribe((data: any) => {
          console.log(data);
          this.cameraTemperingArray = data.latestEvents;
          this.totalItems = data.totalItems;
        });
    }
  }

  onClickCanclevideo() {
    this.wrongSideVideo = false;
    window.location.reload();
    this.ngOnInit();
    this.wrongSideVideoUrl = "";
  }
  onClickCamTripVideo(id: any) {
    this.wrongSideVideo = true;

    // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    this.temperingvideoId = id;
    // console.log(this.wrongsideId,'wrongsideId');

    this.wrongSideVideoUrl = `${environment.url}/playVideo/${id}`;
  }

  searchByDate(data: any) {
    console.log(data, "calender Date");
    const formattedDate = this.datePipe.transform(data, "YYYY-MM-dd");
    let event = "Camera_Tampering";
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
        this.cameraTemperingArray = data.latestEvents;
        this.totalItems = data.totalItems;
      });
  }

  onClickShowvideo(id: any, name: any) {
    this.wrongSideVideo = true;

    // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    this.temperingvideoId = id;
    // console.log(this.wrongsideId,'wrongsideId');

    this.wrongSideVideoUrl = `${environment.url}/playVideo/${id}`;
    this.eventService.playVideoApi(this.temperingvideoId).subscribe((data: any) => {

      //  console.log(this.wrongsideId,'wrongsideId');
      console.log(data, 'wrong side video id wise data');
    }
      ,
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        const url = error.url;
        // console.log('URL:', url);
        this.wrongSideVideoUrl = url
        console.log(this.wrongSideVideoUrl, 'url');

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
    // this.zoomLevel += 10; // Increase the zoom level by 10% (adjust as needed)
    // this.setZoom();
    this.temperingPhoto = false;
    this.temperingzoomPhoto = true;
  }

  onClickCancelPhoto() {
    this.temperingPhoto = false;
    window.location.reload();
    this.temperingImageUrl = "";
    this.ngOnInit();
  }
  onClickShowphoto(id: any, name: any) {
    this.temperingPhoto = true;

    // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    this.temperingId = id;
    this.temperingImageUrl = `${environment.url}/getLatestImage/${id}`;
    // this.eventService.displayImage(this.temperingId).subscribe((data: any) => {
    //   console.log(data, 'wrong side id wise data');
    // }
    //   ,
    //   (error: HttpErrorResponse) => {
    //     console.error('Error:', error);
    //     const url = error.url;
    //     // console.log('URL:', url);
    //     this.temperingImageUrl = url
    //     console.log(this.temperingImageUrl, 'url');

    //   })
  }

  onclickDownloadReport() {
    this.downloadReport = true;
  }

  onDropdownChange(event: any) {
    this.eventValue = event.value;
    console.log(this.eventValue, "event value");
  }
  onclickcameraEvent(event: any) {
    console.log(event.value, "camera event value");
  }

  onDateChange(event: any) {
    const selectedDate: Date = event.target.valueAsDate;

    if (selectedDate) {
      this.endDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  onClickDownloadReport() {
    // if (this.downloadForm.valid) {
    //   console.log(this.downloadForm.value, 'download payload');

    // }
    if (this.eventValue == "Excel") {
      this.downLoad1();
    } else if (this.eventValue == "PDF") {
      this.downLoad2();
    } else if (this.eventValue == "CSV") {
      this.downLoad3();
    }
    this.downloadReport = false;
    this.downloadForm.reset();
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
    this.downloadForm.value.startDate = this.startDate;
    this.downloadForm.value.endDate = this.endDate;
    console.log("excel file ");
    this.eventService.downloadPdfFormate(this.downloadForm.value).subscribe(
      (x: any) => {
        var newBlob = new Blob([x], { type: "application/vnd.ms-excel" });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = "Vids Report.xlsx";
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log("file Downloded");
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
    console.log("pdf file ");
    this.downloadForm.value.startDate = this.startDate;
    this.downloadForm.value.endDate = this.endDate;
    this.eventService.downloadPdfFormate1(this.downloadForm.value).subscribe(
      (x: any) => {
        console.log(this.downloadForm.value, "pdf data  download");

        var newBlob = new Blob([x], { type: "application/pdf" });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = "vds Data.pdf";
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log("file Downloded");
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
    console.log("csv file ");
    // csv formate
    this.downloadForm.value.startDate = this.startDate;
    this.downloadForm.value.endDate = this.endDate;
    this.eventService.downloadPdfFormate2(this.downloadForm.value).subscribe(
      (x: any) => {
        var newBlob = new Blob([x], { type: "text/csv" });
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = "vds Data.csv";
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        console.log("file Downloded");
        // console.log(data,'download file');
        this.downloadForm.reset();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );
  }
}
