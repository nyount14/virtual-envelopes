import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Envelope } from 'src/app/models/envelope.model';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchasesService } from 'src/app/purchases/purchases.service';
import { EnvelopesService } from '../envelopes.service';

@Component({
  selector: 'app-envelope-item',
  templateUrl: './envelope-item.component.html',
  styleUrls: ['./envelope-item.component.css'],
})
export class EnvelopeItemComponent implements OnInit {
  @Input() envelope: Envelope;
  @Input() index: number;
  purchases: Purchase[];


  constructor(private purchasesService: PurchasesService,
              private envelopesService: EnvelopesService,
              private route: ActivatedRoute,
              private router: Router ) {}

  ngOnInit(): void {
  }

  onShowReciepts(){
    // this.purchases = this.purchasesService.getPurchasesByCategory(this.envelope.category)
    // console.log(this.purchases)
    this.router.navigate(['/purchases', this.envelope.category])
  }

  onEdit(){
    this.router.navigate(['/envelopes', this.envelope.category])
  }

  onDelete(){
    console.log(this.envelope.id)
    this.envelopesService.deleteEnvelope1(this.envelope.id)
    this.envelopesService.setEnvelopes
    // this.router.navigate(['/envelopes'])
  }

};
