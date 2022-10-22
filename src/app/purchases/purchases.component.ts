import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EnvelopesService } from '../envelopes/envelopes.service';
import { Purchase } from '../models/purchase.model';
import { Envelope } from '../models/envelope.model';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  params = '';
  filterData: '';
  purchases: Purchase[];
  constructor(private router: Router,
              private purchasesService: PurchasesService,
              private route: ActivatedRoute) {}

    ngOnInit() {
      this.purchasesService.setPurchases()
      this.purchasesService.purchasesChanged
        .subscribe(
          (purchases: Purchase[]) => {
          this.purchases = purchases;
          }
        )
        this.route.params
            .subscribe(
              (params: Params) => {
                this.filterData = params['id'];
                console.log(this.filterData)
                }
              )
            }
          }




// this.route.params
//     .subscribe(
//       (params: Params) => {
//         this.filterData = params['id'];
//         this.purchases = this.purchases.filter(() => {
//           if (this.filterData === this.purchases['category']){
//             return

