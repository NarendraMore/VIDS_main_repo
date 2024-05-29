import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) { }
  WrongSideDetect() {
    // console.log("call in wrogSide")
    return this.http.get(`${environment.url}/wsvehicledetection`);
  }

  getillegalParking() {
    return this.http.get(`${environment.url}/illegalParking`);
  }
  getTripwireData() {
    return this.http.get(`${environment.url}/tripwire`);
  }
  getSpeeddropData() {
    return this.http.get(`${environment.url}/speeddrop`);
  }
  getpersonCrossData() {
    return this.http.get(`${environment.url}/personcross`);
  }
  getCongetion() {
    // console.log("call in wrogSide")
    return this.http.get(`${environment.url}/congestion`);
  }
  animalDetection() {
    return this.http.get(`${environment.url}/animaldetection`);
  }
  objectDetection() {
    return this.http.get(`${environment.url}/objectdetection`);
  }
  FireDetection() {
    // console.log("call in FireDetection");

    return this.http.get(`${environment.url}/firedetection`);
  }
  FogWarning() {
    return this.http.get(`${environment.url}/fogWarning`);
  }
  cameraTempering() {
    return this.http.get(`${environment.url}/cameraTempering`);
  }
  getOverSpeed() {
    return this.http.get(`${environment.url}/overspeed`);
  }
  cameraStatus() {
    // console.log('call in');

    return this.http.get(`${environment.url}/cameraStatus`);
  }
  fetchCamera() {
    // console.log('call in');

    return this.http.get(`${environment.url}/cameraStatus`);
  }
  latestEvents() {
    // console.log('call in');

    return this.http.get(`${environment.url}/latestevents`);
  }

  getanimalVideo(id: any) {
    return this.http.get(`${environment.url}/playNextAnimalVideo/${id}`);
  }
  getanimalImage(id: any) {
    return this.http.get(`${environment.url}/getAnimalImage/${id}`);
  }
  getwrongsideVideo(id: any) {
    return this.http.get(`${environment.url}/playNextWrongSideVideo/${id}`, {});
  }
  overspeedVideo(id: any) {
    return this.http.get(`${environment.url}/playNextOverspeedVideo/${id}`, {
      responseType: 'json',
    });
  }
  getwrongsideImage(id: any) {
    return this.http.get(`${environment.url}/getwrongImage/${id}`, {});
  }
  cameraTemperingImage(id: any) {
    return this.http.get(`${environment.url}/getCameraTemperingImage/${id}`);
  }
  overSpeedImage(id: any) {
    return this.http.get(`${environment.url}/getOverspeedImage/${id}`);
  }
  getillegalParkingimage(id: any) {
    return this.http.get(`${environment.url}/getIllegalParkingImage/${id}`);
  }
  getillegalParkingvideo(id: any) {
    return this.http.get(
      `${environment.url}/playNextIllegalParkingVideo/${id}`
    );
  }
  crossPersonImage(id: any) {
    return this.http.get(`${environment.url}/getPersoncrossImage/${id}`);
  }
  crossPersonVideo(id: any) {
    return this.http.get(`${environment.url}/getPersoncrossVideo/${id}`);
  }
  speedDropImage(id: any) {
    return this.http.get(`${environment.url}/getoSpeedDropImage/${id}`);
  }
  speedDropVideo(id: any) {
    return this.http.get(`${environment.url}/playNextSpeedDropVideo/${id}`);
  }
  tripwireImage(id: any) {
    return this.http.get(`${environment.url}/getTripwireImage/${id}`);
  }
  congestionImage(id: any) {
    return this.http.get(`${environment.url}/getCongestionImage/${id}`);
  }
  getobjectVideo(id: any) {
    return this.http.get(`${environment.url}/playNextObjectVideo/${id}`);
  }
  getobjectImage(id: any) {
    return this.http.get(`${environment.url}/getobjectImage/${id}`);
  }
  getfireVideo(id: any) {
    return this.http.get(`${environment.url}/playNextFireVideo/${id}`);
  }
  getfireImage(id: any) {
    return this.http.get(`${environment.url}/getFireImage/${id}`);
  }
  getlatestEventImage(id: any) {
    return this.http.get(`${environment.url}/getLatestImage/${id}`);
  }

  deleteFalseEvent(id: any) {
    console.log(id, 'delete id wise data');

    return this.http.delete(`${environment.url}/latestevents/${id}`, {
      responseType: 'text',
    });
  }
  getFirstCamera() {
    return this.http.get(`${environment.url}/stream`);
    // console.log('dfdfgds');
  }
  getLiveCameraLUrl() {
    return this.http.get(`${environment.url}/stream`);
  }

  downloadPdfFormate(data: any) {
    console.log(data, 'download Excel in service');
    return this.http.get(`${environment.url}/downloadExcel?startDate=${data.startDate}&endDate=${data.endDate}&startTime=${data.startTime}&endTime=${data.endTime}&event=${data.event}&cameratype=${data.cameratype}`, {
      reportProgress: true,
      responseType: 'blob',
    });
    // console.log(data,'download pdf');
    // return this.http.get(`${environment.url}/downloadData/${data}`)
  }
  downloadPdfFormate1(data: any) {
    console.log(data, 'download pdf');
    return this.http.get(`${environment.url}/downloadData?startDate=${data.startDate}&endDate=${data.endDate}&startTime=${data.startTime}&endTime=${data.endTime}&event=${data.event}&cameratype=${data.cameratype}`, {
      reportProgress: true,
      responseType: 'blob',
    });

    // console.log(data,'download pdf');
    // return this.http.get(`${environment.url}/downloadData/${data}`)
  }
  downloadPdfFormate2(data: any) {
    console.log(data, 'download Csv');
    return this.http.get(`${environment.url}/downloadCSV?startDate=${data.startDate}&endDate=${data.endDate}&startTime=${data.startTime}&endTime=${data.endTime}&event=${data.event}&cameratype=${data.cameratype}`, {
      reportProgress: true,
      responseType: 'blob',
    });
    // console.log(data,'download pdf');
    // return this.http.get(`${environment.url}/downloadData/${data}`)
  }
  getfogvideo(id: any) {
    return this.http.get(`${environment.url}/fogwarningVideo/${id}`);
  }
  getfogImage(id: any) {
    return this.http.get(`${environment.url}/fogwarningImage/${id}`);
  }

  gettruestatus(id: any, status: any) {
    return this.http.patch(`${environment.url}/latestevents/${id}`, { status });
  }
  getLatestEvents(page: any, limit: any) {
    return this.http.get(
      `${environment.url}/latestevents?page=${page}&limit=${limit}`
    );
  }
  getDataBySearch(searchValue:any,page:any,limit:any,eventType:any) {
    console.log(searchValue);
    const data = {
      searchValues:searchValue,
      event:eventType,
      page:page,
      limit:limit
    }
    console.log(data,"data in service");
    
    return this.http.get(
      `${environment.url}/search/${searchValue}?page=${page}&limit=${limit}`
    );
  }
  getDataBySearchonDate(searchValue:any,page:any,limit:any) {
    console.log(searchValue);
    const data = {
      searchValues:searchValue,
      page:page,
      limit:limit
    }
    console.log(data,"data in service");
    
    return this.http.get(
      `${environment.url}/search?page=${page}&limit=${limit}&date=${searchValue}`
    );
  }
  // getLatestEventByEvent(event: any, page: any, limit: any) {
  //   console.log(event.trim,page.trim,limit.trim,"page in service");

  //   return this.http.get(`${environment.url}/latestevents/${event}
  //   ?page=
  //   ${page}
  //   &limit=
  //   ${limit}`);
  // }
  getLatestEventByEvent(event: any, page: any, limit: any) {
    // Ensure each parameter is a string before using trim
    const trimmedEvent = encodeURIComponent(String(event).trim());
    const trimmedPage = encodeURIComponent(String(page).trim());
    const trimmedLimit = encodeURIComponent(String(limit).trim());

    // Construct the URL with the trimmed parameters
    const apiUrl = `${environment.url}/latestevents/${trimmedEvent}?page=${trimmedPage}&limit=${trimmedLimit}`;

    // Make the HTTP request
    return this.http.get(apiUrl);
  }

  playVideoApi(videoId: any) {
    return this.http.get(`${environment.url}/playVideo/${videoId}`);
  }

  displayImage(imageId: any) {
    return this.http.get(`${environment.url}/getLatestImage/${imageId}`);
  }

  //post bookmark
  addBookmark(data: any, id: any) {
    console.log(' in service bookmark', data);

    return this.http.post(`${environment.url}/bookmark`, data)
  }

  getallBookmark() {
    return this.http.get(`${environment.url}/getAllBookmark`)
  }

  getallStaticcevent() {
    return this.http.get(`${environment.url}/eventStatics`)
  }
  getBookmarkdataByid(eventId: any) {
    return this.http.get(`${environment.url}/getBookmark/${eventId}`)
  }
}
