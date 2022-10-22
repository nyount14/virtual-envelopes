import { Purchase } from "../models/purchase.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PurchasesService {

  constructor(private http: HttpClient,
    private router: Router,){

}

  purchasesChanged = new Subject<Purchase[]>();
  private purchases: Purchase[] = []


  addPurchase(purchase: Purchase) {
    this.http
      .post(
        'https://virtualenvelopes-default-rtdb.firebaseio.com/purchases.json',
      purchase
    ).subscribe(responseData => {
      console.log(responseData)
      this.setPurchases();
    });

   }


 setPurchases() {
  this.http
    .get<Purchase>(
      'https://virtualenvelopes-default-rtdb.firebaseio.com/purchases.json'
      )
      .pipe(
        map((responseObject) => {
          const responseArray: Purchase[] = [];
          for (const key in responseObject ) {
            if (responseObject.hasOwnProperty(key))
            responseArray.push({ ...responseObject[key], id: key });
          }
          return responseArray
      })
      ).subscribe(responseArray => {
        console.log(responseArray)
        this.purchases = responseArray.reverse();
        this.purchasesChanged.next(this.purchases.slice())
    });
  }

  deletePurchase(id: string){
    this.http.delete('https://virtualenvelopes-default-rtdb.firebaseio.com/purchases/'+id+'.json')
    .subscribe(responseData => {
      console.log(responseData)
      for(let i = 0; i < this.purchases.length; i++){
        if(this.purchases[i].id === id){
          this.purchases.splice(i, 1)
          this.purchasesChanged.next(this.purchases.slice());
        }
      }
    });
  }

}
