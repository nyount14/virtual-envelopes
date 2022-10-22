import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Envelope } from 'src/app/models/envelope.model';
import { EnvelopesService } from '../envelopes.service';

@Component({
  selector: 'app-envelope-edit',
  templateUrl: './envelope-edit.component.html',
  styleUrls: ['./envelope-edit.component.css']
})
export class EnvelopeEditComponent implements OnInit {
  editEnvelopeForm: FormGroup
  envelope: Envelope;
  id: number;
  category: string;
  amount: number;
  updatedEnvelope: Envelope;
  subscription: Subscription;

  constructor(private envelopesService: EnvelopesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.category = params['id'];
          this.envelope = this.envelopesService.getEnvelope(this.category);
          this.editEnvelopeForm = new FormGroup({
            'category': new FormControl(this.envelope.category),
            'amount': new FormControl(this.envelope.amount)
          })
        }
      )
  }

  onSubmit(){
    this.category = this.editEnvelopeForm.value.category;
    this.amount = this.editEnvelopeForm.value.amount;
    console.log(this.amount)
    this.updatedEnvelope = new Envelope(this.category, this.amount);
    this.envelopesService.addEnvelope(this.updatedEnvelope);
    this.envelopesService.deleteEnvelope1(this.envelope.id)
    this.router.navigate(['/envelopes'])
  }

}

