import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { ContactComponent } from './contact/contact.component';
import { FireDetectionComponent } from './fire-detection/fire-detection.component';
import { WrongSideComponent } from './wrong-side/wrong-side.component';
import { ClassDetectionComponent } from './class-detection/class-detection.component';
import { AnimalDetectionComponent } from './animal-detection/animal-detection.component';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';
import { TrafficManagementComponent } from './traffic-management/traffic-management.component';
import { IncidentTrackingComponent } from './incident-tracking/incident-tracking.component';
import { PartenersComponent } from './parteners/parteners.component';
import { VideosComponent } from './videos/videos.component';
import { SreenShotsComponent } from './sreen-shots/sreen-shots.component';
import { TripwireDetectionComponent } from './tripwire-detection/tripwire-detection.component';

const routes: Routes = [
  {
    path: '',
    component:BodyComponent
  },
  {
    path: 'cantact',
    component:ContactComponent
  },
  {
    path : 'fire-detection',
    component:FireDetectionComponent
  },
  {
    path: 'wrong-side',
    component : WrongSideComponent
  },
  {
    path: 'class-detection',
    component : ClassDetectionComponent
  },
  {
    path: 'animal-detection',
    component: AnimalDetectionComponent
  },
  {
    path: 'object_detection',
    component: ObjectDetectionComponent
  },
  {
    path: "traffic-manege",
    component:TrafficManagementComponent
  },
  {
    path: "incident-tracking",
    component: IncidentTrackingComponent
  },
  {
    path: "partners",
    component: PartenersComponent
  },
  {
    path: "videos",
    component:VideosComponent
  },
  {
    path: "screen-shots",
    component :SreenShotsComponent
  },
  {
    path: "tripwire",
    component:TripwireDetectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
