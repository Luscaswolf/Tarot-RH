import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cardtarot } from '../model/cardtarot'


@Injectable({
  providedIn: 'root'
})
export class GetcardsService {

  constructor( private http: HttpClient) { }

  getCard(): Observable<any>{

    return this.http.get<any>('https://dentalclouddev.s3.amazonaws.com/challenge/tarot.json');
  }
}
