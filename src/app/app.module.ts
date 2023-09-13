import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    FooterComponent,
    ContactComponent,
    FireDetectionComponent,
    WrongSideComponent,
    ClassDetectionComponent,
    AnimalDetectionComponent,
    ObjectDetectionComponent,
    TrafficManagementComponent,
    IncidentTrackingComponent,
    PartenersComponent,
    VideosComponent,
    SreenShotsComponent,
    TripwireDetectionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
