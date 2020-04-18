import { AccueilComponent } from '../accueil/accueil.component';
import { ville } from '../models/ville.model';
import { SncfService } from '../services/sncf.service';
import { Subscription } from 'rxjs';

export class accueil {
  duration: number;
  constructor(

    public dataJourney: any,
    public dataJourneySub: Subscription,
    public today = new Date(),
    public fromPlace: ville,
    public toPlace: ville,
    public optionsFrom: any,
    public optionsTo: any,
    public time: any,
    public choixDate: string,
    public distance: string,
    public prixTrajet: string,
    public monnaie: any,
    public selected: any,
    public selectedView: any,
    public choixDateSelectionnee: any,
  ) { }
}
