import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadersRoutingModule } from './headers-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { SharedModuleModule } from '../shared/shared.module';
import { WrongSideVehicleComponent } from './navbar/wrong-side-vehicle/wrong-side-vehicle.component';
import { FogWarningComponent } from './navbar/fog-warning/fog-warning.component';
import { FireDetectionComponent } from './navbar/fire-detection/fire-detection.component';
import { AnimalDetectionComponent } from './navbar/animal-detection/animal-detection.component';
import { ObjectDetectionComponent } from './navbar/object-detection/object-detection.component';
import { LiveCameraComponent } from './navbar/live-camera/live-camera.component';
import * as L from 'leaflet';
import { MatIconModule } from '@angular/material/icon';
import { ReportComponent } from './navbar/report/report.component';
import { CalendarModule } from 'primeng/calendar';
import { CameraTemperingComponent } from './navbar/camera-tempering/camera-tempering.component';
import { CongestionComponent } from './navbar/congestion/congestion.component';
import { OverSpeedComponent } from './navbar/over-speed/over-speed.component';
import { IlligalParkingComponent } from './navbar/illigal-parking/illigal-parking.component';
import { TripwireComponent } from './navbar/tripwire/tripwire.component';
import { SpeedDropComponent } from './navbar/speed-drop/speed-drop.component';
import { PersonCrossComponent } from './navbar/person-cross/person-cross.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    WrongSideVehicleComponent,
    FogWarningComponent,
    FireDetectionComponent,
    AnimalDetectionComponent,
    ObjectDetectionComponent,
    LiveCameraComponent,
    ReportComponent,
    CameraTemperingComponent,
    CongestionComponent,
    OverSpeedComponent,
    IlligalParkingComponent,
    TripwireComponent,
    SpeedDropComponent,
    PersonCrossComponent,

  ],
  imports: [
    CommonModule,
    HeadersRoutingModule,
    SharedModuleModule,
    MatIconModule,
    CalendarModule,
  ]
})
export class HeadersModule { }
