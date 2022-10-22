import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.css'],
})
export class PurchaseItemComponent implements OnInit {
  @Input() purchase: Purchase;
  @Input() index: number;

  constructor(private purchasesService: PurchasesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.purchasesService.deletePurchase(this.purchase.id);
  }

}
