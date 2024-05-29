import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import {
//   AdminNavbarData,
//   analystNavbarData,
//   NavbarData,
//   userNavbarData,
// } from 'src/app/menus';
// import { BreadcrumbService } from 'xng-breadcrumb';
// import { AppModuleConstants } from 'src/app/app-constants';
// import { IRServiceService } from 'src/app/ir-service.service';
// import { BreadcrumbItemDirective } from 'xng-breadcrumb';
import { filter } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  sidebar: boolean = false;
  user!: string;
  logUser: boolean = false;
  dropdown: boolean = false;
  isActive: boolean = false;
  isActive1: boolean = false;
  isActive2: boolean = false;
  isActive3: boolean = false;
  isActive4: boolean = false;
  constructor(

    private router: Router,
    private route: ActivatedRoute
  ) { }
  userRole: any;
  userName: any;
  navData: any;

  ngOnInit(): void {
    // this.service.emitDialogFormData('done');

    localStorage.removeItem('tableName');
    // this.userRole = sessionStorage.getItem(AppModuleConstants.ROLE)!;
    // this.userName = sessionStorage.getItem(AppModuleConstants.USER)!;
    // if (this.userRole === '1') {
    //   this.navData = AdminNavbarData;
    // } else if (this.userRole === '2') {
    //   this.navData = analystNavbarData;
    // } else if (this.userRole === '3') {
    //   this.navData = userNavbarData;
    // }

    this.navData = [

      {
        routeLink: "dashboard",
        name: "Dashboard",
        image: '',
        icon:'space_dashboard',
        tooltip:'Dashboard'
      },

      {
        routeLink: "live",
        name: "Live Streaming",
        image: '',
        icon:'local_see',
        tooltip:'Live Streaming'
      },
      {
        routeLink: "wrongside",
        name: "Wrong Side Vehicle Detection",
        image: '',
        icon:'commute',
        tooltip:'Wrong Side Detection'
      },
      {
        routeLink: "animaldetection",
        name: "Animal Detection",
        image: '',
        icon:'pets',
        tooltip:'Animal Detection'
      },
      {
        routeLink: "objectdetection",
        name: "Object Detection",
        image: '',
        icon:'sensors',
        tooltip:'Object Detection'
      },
      {
        routeLink: "firedetection",
        name: "Fire Detection",
        image: '',
        icon:'whatshot',
        tooltip:'Fire Detection'
      },
      {
        routeLink: "fogwarning",
        name: "Fog Warning",
        image: '',
        icon:'upcoming',
        tooltip:'Fog Warning'
      },
      {
        routeLink: "tempering",
        name: "Camera Tempering",
        image: '',
        icon:'warning',
        tooltip:'Camera Tempering'
      },
      {
        routeLink: "congestion",
        name: "Congestion",
        image: '',
        icon:'local_car_wash',
        tooltip:'Congestion'
      },
      {
        routeLink: "overspeed",
        name: "Overspeed",
        image: '',
        icon:'directions_subway',
        tooltip:'Overspeed'
      },
      {
        routeLink: "illigal",
        name: "Illegal Parking",
        image: '',
        icon:'block',
        tooltip:'Illegal Parking'
      },
      {
        routeLink: "tripwire",
        name: "Trip Wire",
        Image:'',
        icon:'accessibility',
        tooltip:'Trip Wire',
        
      },
      {
        routeLink: "speedDrop",
        name: "Speed Drop",
        Image:'',
        icon:'slow_motion_video',
        tooltip:'Speed Drop',
        
      },
      {
        routeLink: "personCross",
        name: "Person Cross",
        Image:'',
        icon:'directions_run',
        tooltip:'Person Cross',
        
      }
      // {
      //   routeLink: "report",
      //   name: "Report",
      //   image: '',
      //   icon:'receipt',
      //   tooltip:'Report'
      // },
      // {
      //   routeLink: "vehicledetection",
      //   name: "Vehicle Detection and Counting",
      //   image: '',
      //   icon:'pi-car',
      //   tooltip:'Vehicle Detection and Counting'
      // },

    ]

    // console.log(this.userRole, ' ', this.userName);
    // console.log(this.navData, 'navdata');
    // console.log(this.breadcrumbService);

    this.screenWidth = window.innerWidth;
    // this.breadcrumbService.set('@ChildOne', 'Child One');
    this.user = JSON.stringify(localStorage.getItem('user'));
  }

  sideBar() {
    if (this.sidebar == false) {
      this.sidebar = true;
    } else {
      this.sidebar = false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  dropdownValue() {
    this.dropdown = true;
  }

  onClickHome() {
    if (this.sidebar == false) {
      this.sidebar = true;
    } else {
      this.sidebar = false;
    }
    this.router.navigate(['/document/home/role-mng']);
  }

  onClickData() { }

  onClickAnalysis() { }

  onClickReport() { }

  onClickMeetings() { }

  onClickConfiguration() {
    if (this.sidebar == false) {
      this.sidebar = true;
      localStorage.removeItem('tableName');
    } else {
      this.sidebar = false;
    }
    this.router.navigate(['/document/nav/role']);
    localStorage.removeItem('tableName');
  }

  config: boolean = false;
  onClickConfig() {
    this.config = true;
  }

  onClickAnchor() {
    this.isActive = true;
    this.isActive1 = false;
    this.isActive2 = false;
    this.isActive3 = false;
    this.isActive4 = false;
  }

  onClickAnchor1() {
    this.isActive = false;
    this.isActive1 = true;
    this.isActive2 = false;
    this.isActive3 = false;
    this.isActive4 = false;
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;

  // navData = navbarData;

  // navbar =nav;
  isSideNavCollapsed = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapse(): void {
    if (this.collapsed === true) {
      this.collapsed = false;
    } else {
      this.collapsed = true;
    }
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  onclicktoggal(){
    this.collapsed = false;
  }
  toggleCollapse1(status: any): void {
    if (this.collapsed === true) {
      this.collapsed = false;
    } else {
      this.collapsed = false;
    }
    console.log(status);

    if (!status) {
      alert('This Option is not in Service');
    }
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }



}
