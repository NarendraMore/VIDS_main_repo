import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EventService } from "src/app/service/event.service";
import * as L from "leaflet";
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
// import { AuthService } from 'src/app/services/auth.service';
declare var google: any;
import { Subject, debounceTime, interval } from "rxjs";
import { environment } from "src/environments/environment";
import { EventType } from "@angular/router";
import { Calendar } from "primeng/calendar";
import { DatePipe, formatDate } from "@angular/common";

export interface camerastatus {
  ip: string;
  port: string;
  status: string;
}

export interface Event {
  eventName: any;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class DashboardComponent implements OnInit {
  @ViewChild("map", { static: true }) private mapContainer!: ElementRef;
  private map!: L.Map;

  latestEventId: any;
  latestEentsArr: any;
  options: any;
  equipments: any;
  DashboardPhoto: boolean = false;
  latestEventUrl: any;
  userLocation = { lat: 123.456, lng: 789.123 };
  eventName: any;
  isSeen: boolean = false;
  cameraStatus: boolean = false;
  DashboardzoomPhoto: boolean = false;
  googleMap: boolean = false;
  // setStatus:any='InActive'
  selectedItemId: any;
  setStatus: string = "";
  activeItemIds: string[] = [];
  disabledFalseButtonsMap: Map<any, boolean> = new Map();
  activeItemIds1: string[] = [];
  isButtonBDisabled: boolean = false;
  latestEvents: any[] = [];
  totalItems: number = 0;
  first: number = 0;
  currentPage: any = 1;
  itemsPerPage: number = 10;
  eventData: any[] = [];
  locationData: any[] = [];
  selectedEvent: any;
  selectedLocation: any;
  CamerastatusArray: camerastatus[] = [];
  eventType: Event[] = [];
  bookmark: any[] = [];
  staticStic: any[] = [];
  isBookmarked: boolean = false;
  dateForSearch: any;
  constructor(
    private eventservice: EventService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) {
    this.eventType = [
      { eventName: "Animal_Detection" },
      { eventName: "Camera_Tampering" },
      { eventName: "Congestion_Detected" },
      { eventName: "Fire_Detection" },
      { eventName: "Fog_Detection" },
      { eventName: "Illegal_Parking" },
      { eventName: "Object_Detection" },
      { eventName: "Over_Speed" },
      { eventName: "Personcross" },
      { eventName: "Speed_Drop" },
      { eventName: "Tripwire" },
      { eventName: "Wrong_Side" },
    ];
  }
  keyWord: string = "";
  private inputChanged = new Subject<string>();
  ngOnInit(): void {
    this.currentPage = 1;
    sessionStorage.setItem("currentPage", this.currentPage);
    const savedPage = sessionStorage.getItem("currentPage");
    this.currentPage = savedPage ? parseInt(savedPage, 10) : 1;
    // this.initializeMap();
    this.loadLatestEvents();
    this.eventservice.getallBookmark().subscribe((bookmarkData: any) => {
      this.bookmark = bookmarkData.slice().reverse();
      console.log("bookmarkData all data", this.bookmark);
    });

    this.eventservice
      .getallStaticcevent()
      .subscribe((staticsticeventData: any) => {
        console.log("staticsticevent Data", staticsticeventData);
        this.staticStic = staticsticeventData;
      });

    this.inputChanged.pipe(debounceTime(300)).subscribe(() => {
      // Call your function here, e.g., this.searchKeyword();
      console.log("Input value changed:", this.keyWord);
      this.searchKeyword();
    });

    // this.initMap();

    // const refreshInterval = interval(5000);
    // refreshInterval.subscribe(() => {
    //   this.eventservice.latestEvents().subscribe((data) => {
    //     this.latestEentsArr = data;

    //     // console.log(this.latestEentsArr, 'latestEentsArr');

    //     for (let i = 0; i < this.latestEentsArr.length; i++) {
    //       // console.log(this.latestEentsArr[i].status, 'ujfgjkghuj');

    //       if (this.latestEentsArr[i].status == true) {
    //         this.latestEentsArr[i].isActive = true;
    //       }
    //     }
    //   });
    // });
  }

  getBookmarkDatabyId(id: any) {
    // this.eventservice.getBookmarkdataByid(id).subscribe((bookmarkdatabyId:any)=>{
    //   console.log('bookmarkdatabyId',bookmarkdatabyId);
    //   this.bookmark = bookmarkdatabyId
    // })
  }

  filterDataByEvent(data: any) {
    console.log(data, "after click dropdown");
    this.eventservice
      .getLatestEventByEvent(data, this.currentPage, this.itemsPerPage)
      .subscribe((eventData: any) => {
        console.log(eventData, "FiredetectionData");
        this.latestEvents = eventData.latestEvents;
        this.totalItems = eventData.totalItems;
      });
  }
  onClickCancelPhoto() {
    this.DashboardPhoto = false;
    window.location.reload();
    this.latestEventUrl = "";
    this.ngOnInit();
  }
  onclickLatesevent(id: any, name: any) {
    this.DashboardPhoto = true;
    this.eventName = name;
    // console.log(this.latestEentsArr,'array data');
    //  for (let i = 0; i < this.latestEentsArr.length; i++) {
    //       // console.log(this.Wrongside[i]._id,'ujfgjkghuj');
    //       this.latestEventId = this.latestEentsArr[i]._id
    //     }

    this.latestEventUrl = `${environment.url}/getLatestImage/${id}`;
    this.eventservice.displayImage(id).subscribe(
      (eventData: any) => {
        console.log(eventData, "eventdata");
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
        const url = error.url;
        // console.log('URL:', url);
        this.latestEventUrl = url;
        console.log(this.latestEventUrl, "url");
      }
    );
  }
  initMap(): void {
    const map = new google.maps.Map(document.getElementById("google-map"), {
      center: { lat: 40.73061, lng: -73.935242 }, // Initial map center coordinates
      zoom: 10, // Initial zoom level
    });

    // You can add markers, polygons, or other map features here
  }
  // private initializeMap(): void {
  //   this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13); // Initial coordinates and zoom level
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(this.map);
  // }

  zoomInImage() {
    this.DashboardzoomPhoto = true;
    this.DashboardPhoto = false;
  }
  onClickfalseDetection(id: any, event: any) {
    // this.isButtonBDisabled = true
    this.confirmationService.confirm({
      message: "Are you sure that you want to Delete this Event?",
      accept: () => {
        this.eventservice.deleteFalseEvent(id).subscribe(
          (data: any) => {
            console.log(data, "deleted data");

            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Event Deleted Successfully",
            });

            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            console.log(error, "error");

            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: `${error.error.developerMessage}`,
            });
            this.ngOnInit();
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: "warn",
          summary: "Cancelled",
          detail: "Event not Deleted",
        });
      },
    });
  }

  //bookmark code

  onclickBookmark(id: any, event: any) {
    // console.log('event id :...',id);
    this.isBookmarked = !this.isBookmarked;

    const bookmark = {
      eventId: id,
      event: event.event,
      date: event.date,
      time: event.time,
      cameratype: event.cameratype,
      location: event.location,
      imagepath: event.imagepath,
      videopath: event.videopath,
      assignBy: "null",
      note: "null",
      imageUrl: event.imageUrl,
    };
    this.eventservice.addBookmark(bookmark, id).subscribe(
      (bookmarkdata: any) => {
        console.log("bookmarkdata return response", bookmarkdata);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
        alert(error.error.error);
        // if(error.status===400){
        //   alert("This event is already bookmarked")
        // }
        console.log(error);
      }
    );

    // window.location.reload();
    // this.ngOnInit();
    // this.getBookmarkDatabyId(id)
  }
  onClickTrueDetection(id: any, event: any) {
    const eventId = id;
    const status = "true";

    if (!this.activeItemIds.includes(id)) {
      this.activeItemIds.push(id);
    }
    this.eventservice.gettruestatus(eventId, status).subscribe((data: any) => {
      const trueValue = data.status;

      this.loadLatestEvents();
    });
  }
  // disableFalseButton(id:any){
  //   if( this.disabledFalseButtonsMap.set(id, true)){
  //     this.isButtonBDisabled =true
  //   }
  //   // this.disabledFalseButtonsMap.set(id, true);
  //   console.log(this.disabledFalseButtonsMap,'disabledFalseButtonsMap');

  // }
  onclickCameraStatus() {
    this.cameraStatus = true;
    this.eventservice.cameraStatus().subscribe((data: any) => {
      this.equipments = data;
      const uniqueIPs = new Set<string>();
      this.equipments = this.equipments.filter((equipment: { ip: string }) => {
        if (!uniqueIPs.has(equipment.ip)) {
          uniqueIPs.add(equipment.ip);
          return true;
        }
        return false;
      });
      this.CamerastatusArray = this.equipments;
      console.log("machine service", this.CamerastatusArray);

      // for(let i=0;this.equipments.length;i++){
      //   console.log(this.equipments[i].ip,'ip');
      // }
    });
  }

  onclickShowMap() {
    this.googleMap = true;
  }

  // onPageChange(event: any): void {
  //   console.log("onPageChange triggered:", event);
  //   this.currentPage = event.page + 1; // PrimeNG Paginator uses 0-based indexing
  //   sessionStorage.setItem("currentPage", this.currentPage);
  //   const eventType = "All";
  //   if (
  //     (this.keyWord == "" || this.keyWord == undefined) &&
  //     this.dateForSearch == null
  //   ) {
  //     this.loadLatestEvents();
  //   } else {
  //     this.eventservice
  //       .getDataBySearchonDate1(
  //         this.keyWord,
  //         this.formattedDate,
  //         sessionStorage.getItem("currentPage"),
  //         this.itemsPerPage
  //       )
  //       .subscribe((data: any) => {
  //         console.log(data);
  //         this.latestEvents = data.latestEvents;
  //         this.totalItems = data.totalItems;
  //       });
  //   }
  // }
  onPageChange(event: any): void {
    console.log("onPageChange triggered:", event);
    this.currentPage = event.page + 1; // PrimeNG Paginator uses 0-based indexing
    sessionStorage.setItem("currentPage", this.currentPage.toString());
    
    if (!this.keyWord && !this.dateForSearch) {
      this.loadLatestEvents();
    } else {
      this.eventservice
        .getDataBySearchonDate1(
          this.keyWord,
          this.formattedDate,
          this.currentPage,
          this.itemsPerPage
        )
        .subscribe((data: any) => {
          console.log(data);
          this.latestEvents = data.latestEvents;
          this.totalItems = data.totalItems;
        });
    }
  }
  

  loadLatestEvents(): void {
    console.log("Loading data for page:", this.currentPage);
    this.eventservice
      .getLatestEvents(sessionStorage.getItem("currentPage"), this.itemsPerPage)
      .subscribe(
        (response: any) => {
          this.latestEvents = response.latestEvents;

          this.totalItems = response.totalItems;
          console.log(this.latestEvents, this.totalItems, "latest event");
          for (let i = 0; i < this.latestEvents.length; i++) {
            // console.log(this.latestEentsArr[i].status, 'ujfgjkghuj');

            if (this.latestEvents[i].status == true) {
              this.latestEvents[i].isActive = true;
            }
          }

          const uniqueEvent = new Set(this.latestEvents);
          this.eventData = Array.from(uniqueEvent);

          const uniqueEventData = new Set(
            this.eventData.map((item) => item.event)
          );
          this.eventData = Array.from(uniqueEventData).map((event) => ({
            event,
          }));
          const uniqueLocation = new Set(this.latestEvents);
          this.locationData = Array.from(uniqueLocation);

          const uniqueLocationData = new Set(
            this.locationData.map((item) => item.location)
          );
          this.locationData = Array.from(uniqueLocationData).map(
            (location) => ({
              location,
            })
          );
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  onInputChange(event: any) {
    console.log(event.target.value, "event value");
    this.keyWord = event.target.value;
    // Trigger the debounced input change
    this.inputChanged.next(this.keyWord);
  }
  searchKeyword() {
    const eventType = "All";

    this.eventservice
      .getDataBySearchonDate1(
        this.keyWord,
        this.formattedDate,
        sessionStorage.getItem("currentPage"),
        this.itemsPerPage
      )
      .subscribe((data: any) => {
        console.log(data);
        this.latestEvents = data.latestEvents;
        this.totalItems = data.totalItems;
      });
    if (this.keyWord === "") this.loadLatestEvents();
  }
  formattedDate: any;
  searchByDate(data: any) {
    console.log(data, "calender Date");
    this.formattedDate = this.datePipe.transform(data, "YYYY-MM-dd");

    // console.log(formattedDate, "Formatted Date");
    this.eventservice
      .getDataBySearchonDate(
        this.formattedDate,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe((data: any) => {
        console.log("formate data", data);
        this.latestEvents = data.latestEvents;
        this.totalItems = data.totalItems;
      });
  }
}
