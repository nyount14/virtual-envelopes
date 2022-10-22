import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvelopesService } from './envelopes/envelopes.service';
import { Envelope } from './models/envelope.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  subscription: Subscription;

  constructor(private http: HttpClient, private envelopesService: EnvelopesService) { }


  addEnvelopeToFB(){
    const envelopes = this.envelopesService.getEnvelopes();
    this.subscription = this.envelopesService.envelopesChanged.subscribe(
      (envelopes: Envelope[]) => {
        envelopes = envelopes
      }
    )
    this.http
      .put(
        'https://virtualenvelopes-default-rtdb.firebaseio.com/envelopes.json',
        envelopes
      ).subscribe(responseData => {
        console.log(responseData)
      });
  }


}
