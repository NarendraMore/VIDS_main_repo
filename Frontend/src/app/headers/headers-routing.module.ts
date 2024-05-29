import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { AuthModule } from '../auth/auth.module';
import { WrongSideVehicleComponent } from './navbar/wrong-side-vehicle/wrong-side-vehicle.component';
import { FogWarningComponent } from './navbar/fog-warning/fog-warning.component';
import { FireDetectionComponent } from './navbar/fire-detection/fire-detection.component';
import { AnimalDetectionComponent } from './navbar/animal-detection/animal-detection.component';
import { ObjectDetectionComponent } from './navbar/object-detection/object-detection.component';
import { LiveCameraComponent } from './navbar/live-camera/live-camera.component';
import { ReportComponent } from './navbar/report/report.component';
import { CameraTemperingComponent } from './navbar/camera-tempering/camera-tempering.component';

import { CongestionComponent } from './navbar/congestion/congestion.component';
import { OverSpeedComponent } from './navbar/over-speed/over-speed.component';
import { IlligalParkingComponent } from './navbar/illigal-parking/illigal-parking.component';
import { TripwireComponent } from './navbar/tripwire/tripwire.component';
import { SpeedDropComponent } from './navbar/speed-drop/speed-drop.component';
import { PersonCrossComponent } from './navbar/person-cross/person-cross.component';

const routes: Routes = [
  {
    path: 'nav', component: NavbarComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'wrongside', component: WrongSideVehicleComponent
      },
      {
        path: 'fogwarning', component: FogWarningComponent
      },
      {
        path: 'firedetection', component: FireDetectionComponent
      },
      {
        path: 'animaldetection', component: AnimalDetectionComponent
      },
      {
        path: 'objectdetection', component: ObjectDetectionComponent
      },
      {
        path: 'live', component: LiveCameraComponent
      },
      {
        path: 'report', component: ReportComponent
      },
      {
        path: 'tempering', component: CameraTemperingComponent
      },
      {
        path: 'congestion' , component : CongestionComponent
      },
      {
        path: 'overspeed' , component : OverSpeedComponent
      },
      {
        path: 'illigal' , component : IlligalParkingComponent
      },
      {
        path: 'tripwire' , component :TripwireComponent
      },
      {
        path: 'speedDrop' , component : SpeedDropComponent
      },
      {
        path: 'personCross', component : PersonCrossComponent
      }
    ]
  },
  {
    path: '',
    loadChildren: () => AuthModule,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadersRoutingModule { }
