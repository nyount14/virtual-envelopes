import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { PaymentMethod } from "../models/paymentmethod.model";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class PaymentMethodsService {

constructor(private http: HttpClient,
            private router: Router,){

}

paymentMethodsChanged = new Subject<PaymentMethod[]>();
private paymentMethods: PaymentMethod[] = []

addPaymentMethod(paymentMethod: PaymentMethod){
  this.http
    .post(
      'https://virtualenvelopes-default-rtdb.firebaseio.com/paymentmethods.json',
      paymentMethod
    ).subscribe(responseData => {
      console.log(responseData)
      this.setPaymentMethods();
    });
}

  setPaymentMethods() {
    this.http
      .get<PaymentMethod>(
        'https://virtualenvelopes-default-rtdb.firebaseio.com/paymentmethods.json'
        )
        .pipe(
          map((responseObject) => {
            const responseArray: PaymentMethod[] = [];
            for (const key in responseObject ) {
              if (responseObject.hasOwnProperty(key))
              responseArray.push({ ...responseObject[key], id: key });
            }
            return responseArray
        })
        ).subscribe(responseArray => {
          console.log(responseArray)
          this.paymentMethods = responseArray
          this.paymentMethodsChanged.next(this.paymentMethods.slice())
        })
      }

    deletePaymentMethod(id: string){
      this.http.delete('https://virtualenvelopes-default-rtdb.firebaseio.com/paymentmethods/'+id+'.json')
      .subscribe(responseData => {
        for(let i = 0; i < this.paymentMethods.length; i++){
          if(this.paymentMethods[i].id === id){
            this.paymentMethods.splice(i, 1)
            this.paymentMethodsChanged.next(this.paymentMethods.slice());
          }
        }
      });

      }
}

