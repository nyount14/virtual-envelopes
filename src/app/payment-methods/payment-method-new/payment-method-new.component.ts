import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentMethod } from 'src/app/models/paymentmethod.model';
import { PaymentMethodsService } from '../payment-methods.service';

@Component({
  selector: 'app-payment-method-new',
  templateUrl: './payment-method-new.component.html',
  styleUrls: ['./payment-method-new.component.css']
})
export class PaymentMethodNewComponent implements OnInit {

  @ViewChild('f') newPaymentForm: NgForm;
  paymentmethods: PaymentMethod[];
  method: string;
  newPaymentMethod: PaymentMethod

  constructor(private paymentMethodsService: PaymentMethodsService,
              private router: Router) {}

ngOnInit(): void {
}

onSubmit() {
this.method = this.newPaymentForm.value.method;
this.newPaymentMethod = new PaymentMethod(this.method);
this.paymentMethodsService.addPaymentMethod(this.newPaymentMethod);
this.router.navigate(['/paymentmethods'])
};


}
