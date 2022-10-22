import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/models/paymentmethod.model';
import { PaymentMethodsService } from '../payment-methods.service';

@Component({
  selector: 'app-payment-method-item',
  templateUrl: './payment-method-item.component.html',
  styleUrls: ['./payment-method-item.component.css']
})
export class PaymentMethodItemComponent implements OnInit {
  @Input() paymentMethod: PaymentMethod;
  @Input() index: number;
  paymentMethods: PaymentMethod[];


  constructor(private paymentMethodService: PaymentMethodsService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
  }

  onShowReciepts(){
    // this.purchases = this.purchasesService.getPurchasesByCategory(this.envelope.category)
    // console.log(this.purchases)
    this.router.navigate(['/purchases', this.paymentMethod.method])
  };

  onDelete(){
    this.paymentMethodService.deletePaymentMethod(this.paymentMethod.id)
  }

}
