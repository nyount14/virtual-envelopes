import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Envelope } from '../models/envelope.model';
import { EnvelopesService } from './envelopes.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-envelopes',
  templateUrl: './envelopes.component.html',
  styleUrls: ['./envelopes.component.css']
})
export class EnvelopesComponent implements OnInit, OnDestroy {

  envelopesChanged = new Subject<Envelope[]>();
  envelopes: Envelope[];
  category: string;
  amount: number;
  isFetching = false
  error = ""
  subscription: Subscription;
  // setEnvelopesSubs: Subscription



  constructor(private envelopesService: EnvelopesService,
              private router: Router,
              private http: HttpClient,
              ) {}

ngOnInit() {
  this.subscription = this.envelopesService.envelopesChanged
      .subscribe(
        (envelopes: Envelope[]) => {
          this.envelopes = envelopes;
        }
      );
  this.envelopesService.setEnvelopes()
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}


// fetchEnvelopes(){
//   this.envelopesService.setEnvelopes()
//   this.isFetching = true
//   this.envelopesService.setEnvelopes().subscribe(envelopes => {
//   this.isFetching = false;
//   this.envelopes = envelopes;
//   this.envelopesService.envelopesChanged.subscribe(changedEnvelops => {
//     console.log(changedEnvelops)
//   });
//   }, error => {
//     this.isFetching = false;
//     this.error = error.message;
//   }
// }


// onHandleError() {
// this.error = null
// }

// onDeleteAll() {
//   this.envelopesService.deleteEnvelopes().subscribe(() => {
//     this.envelopes
//   })
// }

}
