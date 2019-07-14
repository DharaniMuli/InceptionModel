import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  api = 'http://127.0.0.1:5000/upload'

  constructor(private http: HttpClient) { }
  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);
    // @ts-ignore
    return this.http.post(this.api, formData);
  }
}
