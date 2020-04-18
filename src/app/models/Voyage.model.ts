import { DateModel } from './date.model';

export class Voyage {
  duration: number;
  constructor(
    public from: any,
    public to: any,
    public departDate: DateModel,
    public arrivalDate: DateModel,
    public distance: any,
    public duree: any,
    public DureeSeconde: number,
    public DureeTotale: any
  ) { }
}
