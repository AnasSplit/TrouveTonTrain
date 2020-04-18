import { Injectable } from '@angular/core';
import { ville } from '../models/ville.model';
import { SncfService } from '../services/sncf.service';
import { Subscription } from 'rxjs';
import { AccueilComponent } from '../accueil/accueil.component';
import { accueil } from '../models/accueil.model';

@Injectable()
export class SoapService {

  dataJourney: any;
  dataJourneySub: Subscription;
  today = new Date();
  fromPlace: ville;
  toPlace: ville;
  optionsFrom: any;
  optionsTo: any;
  time: any;
  choixDate: string;
  distance: string;
  prixTrajet: string;
  monnaie: any;
  selected: any;
  selectedView: any;
  choixDateSelectionnee: any;


  constructor(private sncfService: SncfService) {
    this.dataJourneySub = this.sncfService.dataJourneySubject.subscribe(
      (data: any) => {
        this.dataJourney = data;
        console.log(this.dataJourney);
      }
    );
  }

  calcLength() {
    let lat1 = parseFloat(this.fromPlace.lat);
    const lon1 = parseFloat(this.fromPlace.long);
    let lat2 = parseFloat(this.toPlace.lat);
    const lon2 = parseFloat(this.toPlace.long);
    const R = 6371; // Distance en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    lat1 = (lat1) * Math.PI / 180;
    lat2 = (lat2) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.distance = (R * c).toFixed(0);
    this.Prix();
  }

  //Rest
  Prix() {
    this.selectedView = this.monnaie.filter(d => d.value === this.selected).map(d => d.viewValue);
    this.sncfService.priceCalcul(this.distance, this.selected).subscribe((response: number) => {
      this.prixTrajet = response.toFixed(2);
    });
  }

}
