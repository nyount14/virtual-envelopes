import { Envelope } from "./envelope.model";
import { PaymentMethod } from "./paymentmethod.model";


export class Purchase {
  constructor(
    public amount: number,
    public category: string,
    public date: string,
    public description: string,
    public paymentmethod: string,
    public id?: string
    ) {}
};
