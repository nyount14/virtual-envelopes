import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { PaymentMethod } from '../models/paymentmethod.model';
import { PaymentMethodsService } from './payment-methods.service';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {

  paymentMethodsChanged = new Subject<PaymentMethod[]>();
  paymentMethods: PaymentMethod[];
  method: string;
  isFetching = false
  error = ""
  subscription: Subscription;

  constructor(private paymentMethodsService: PaymentMethodsService,
              private router: Router,
              private http: HttpClient) {}

  ngOnInit() {
    this.subscription = this.paymentMethodsService.paymentMethodsChanged
    .subscribe(
      (paymentMethod: PaymentMethod[]) => {
        this.paymentMethods = paymentMethod;
      }
    );
    this.paymentMethodsService.setPaymentMethods();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
