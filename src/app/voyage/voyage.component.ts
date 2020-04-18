import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Voyage } from '../models/Voyage.model';
import { DateModel } from '../models/date.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})

export class VoyageComponent implements OnChanges {
  @Input() voyage: any;
  @Input() distance: any;
  @Input() choixDate: string;
  journeyList: Voyage[] = [];
  DureeTotale: any;

  constructor(private dataService: DataService) { }

  ngOnChanges() {
    if (this.voyage) {
      this.choixDate = this.formaliseDate(this.choixDate);
      this.journeyList = [];
      this.voyage.forEach(v => {
        this.journeyList.push(new Voyage(
          v.from.stop_point,
          v.to.stop_point,
          new DateModel(
            this.formaliseDate(v.departure_date_time),
            this.formaliseHeure(v.departure_date_time)),
          new DateModel(
            this.formaliseDate(v.arrival_date_time),
            this.formaliseHeure(v.arrival_date_time)),
          this.distance,
          this.ConvertisseurSecondes(v.duration),
          v.DureeSeconde,
          '')
        );
      }
      );
      this.DureeTotale = this.CaculDureeTotale(this.voyage);
    }
  }

  ngOnInit(): void {
  }

  formaliseDate(date: string) {
    const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const jourMois = date.substr(4, 2)[0] === '0' ? date.substr(4, 6)[1] : date.substr(4, 6);
    const month = mois[parseInt(jourMois, 0) - 1];
    return date.substr(6, 2) + ' ' + month + ' ' + date.substr(0, 4);
  }

  formaliseHeure(date: string) {
    return date.substr(9, 2) + 'h' + date.substr(11, 2);
  }

  ConvertisseurSecondes(totalSeconds: number) {
    const heures = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (heures * 3600)) / 60);

    let result = (heures < 10 ? '0' + heures : heures);
    result += 'H' + (minutes < 10 ? '0' + minutes : minutes) + 'Min';
    return result;
  }

  CaculDureeTotale(Voyage: any) {
    let totalSeconds = 0;
    Voyage.forEach((v: Voyage) => {
      totalSeconds += v.duration;
    });
    const heures = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (heures * 3600)) / 60);

    let result = (heures < 10 ? '0' + heures : heures);
    result += ':' + (minutes < 10 ? '0' + minutes : minutes);
    this.journeyList[0].DureeTotale = result;
    return result;

  }
}