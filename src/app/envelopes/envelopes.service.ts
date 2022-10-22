import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Envelope } from "../models/envelope.model";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class EnvelopesService {

  envelopesChanged = new Subject<Envelope[]>();
  private envelopes: Envelope[] = []
  editedEnvelope: Envelope

  constructor(private http: HttpClient,
              private router: Router){

  }

  addEnvelope(envelope: Envelope) {
    this.http
      .post(
        'https://virtualenvelopes-default-rtdb.firebaseio.com/envelopes.json',
        envelope
      ).subscribe(responseData => {
        console.log(responseData)
        this.setEnvelopes();
      });
  }

  setEnvelopes() {
    this.http
      .get<Envelope>(
        'https://virtualenvelopes-default-rtdb.firebaseio.com/envelopes.json'
      )
      .pipe(
        map((responseObject) => {
          const responseArray: Envelope[] = [];
          for (const key in responseObject ) {
            if (responseObject.hasOwnProperty(key))
            responseArray.push({ ...responseObject[key], id: key });
          }
          return responseArray
      })
      ).subscribe(responseArray => {
        console.log(responseArray)
        this.envelopes = responseArray.reverse();
        this.envelopesChanged.next(this.envelopes.slice());
      });
    }

    deleteEnvelope1(id: string){
      this.http.delete('https://virtualenvelopes-default-rtdb.firebaseio.com/envelopes/'+id+'.json')
        .subscribe(responseData => {
          console.log(responseData)
          for(let i = 0; i < this.envelopes.length; i++){
            if(this.envelopes[i].id === id){
              this.envelopes.splice(i, 1)
              this.envelopesChanged.next(this.envelopes.slice());
            }
          }
        });
      // this.envelopesChanged.next(this.envelopes.slice());
    }


  getEnvelope(category: string) {
    for(let i = 0; i < this.envelopes.length; i++){
      if(this.envelopes[i].category === category){
        this.editedEnvelope = this.envelopes[i];
      }
    }
    return this.editedEnvelope;
  }

  // getEnvelopes() {
  //   return this.envelopes.slice();
  // }

}
