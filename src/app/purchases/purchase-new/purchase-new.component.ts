import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvelopesService } from 'src/app/envelopes/envelopes.service';
import { Envelope } from 'src/app/models/envelope.model';
import { Purchase } from 'src/app/models/purchase.model';
import { PaymentMethod } from 'src/app/models/paymentmethod.model';
import { PurchasesService } from '../purchases.service';
import { PaymentMethodsService } from 'src/app/payment-methods/payment-methods.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrls: ['./purchase-new.component.css']
})
export class PurchaseNewComponent implements OnInit, OnDestroy {

  @ViewChild('f') newPurchaseForm: NgForm;
  envelopesChanged = new Subject<Envelope[]>();
  newEnvelopeAmount: number
  newEnvelope: Envelope
  oldEnvelope: Envelope;
  envelopes: Envelope[];
  paymentMethods: PaymentMethod[];
  default = ''


  purchases: Purchase[];
  amount: number;
  category: string;
  date: string;
  description: string;
  paymentmethod: string;
  newPurchase: Purchase;
  envelopeSub: Subscription;
  paymentMethodSub: Subscription;

  constructor(private purchasesService: PurchasesService,
              private envelopesService: EnvelopesService,
              private paymentMethodsService: PaymentMethodsService,
              private router: Router ) { }

  ngOnInit() {
    this.envelopeSub = this.envelopesService.envelopesChanged
      .subscribe(
        (envelopes: Envelope[]) => {
          this.envelopes = envelopes;
        }
      );
    this.envelopesService.setEnvelopes();
    this.paymentMethodSub = this.paymentMethodsService.paymentMethodsChanged
    .subscribe(
      (paymentMethods: PaymentMethod[]) => {
        this.paymentMethods = paymentMethods;
      }
    );
    this.paymentMethodsService.setPaymentMethods();
  }

  ngOnDestroy() {
    this.envelopeSub.unsubscribe();
    this.paymentMethodSub.unsubscribe();
  }


  onSubmit() {
    this.amount = this.newPurchaseForm.value.amount;
    this.category = this.newPurchaseForm.value.category;
    this.date = this.newPurchaseForm.value.date;
    this.description = this.newPurchaseForm.value.description;
    this.paymentmethod = this.newPurchaseForm.value.paymentmethod;

    this.newPurchase = new Purchase(
      this.amount,
      this.category,
      this.date,
      this.description,
      this.paymentmethod);
    this.purchasesService.addPurchase(this.newPurchase);

    for(let i = 0; i < this.envelopes.length; i++){
      if(this.envelopes[i].category == this.category){
        this.newEnvelopeAmount = this.envelopes[i].amount - +this.amount
        this.newEnvelope = new Envelope(
          this.envelopes[i].category,
          this.newEnvelopeAmount);
        this.envelopesService.addEnvelope(this.newEnvelope);
        this.oldEnvelope = this.envelopes[i]
        this.envelopesService.deleteEnvelope1(this.oldEnvelope.id)
        this.envelopeSub
        }
      }
      this.router.navigate(['/envelopes'])
    }

  }
