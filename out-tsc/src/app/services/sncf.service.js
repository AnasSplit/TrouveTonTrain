import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Place } from '../models/place.model';
import { map } from 'rxjs/operators';
let SncfService = class SncfService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.sncfToken = '42c3e2d7-a940-40df-90c8-b20dc21612c5';
        this.dataJourneySubject = new Subject();
    }
    emitDataJourneySubject() {
        this.dataJourneySubject.next(this.dataJourney);
    }
    getPlace(data, placeName) {
        const place = data.places.find(p => p.administrative_region.name === placeName);
        return new Place(placeName, place.administrative_region.id, place.administrative_region.coord.lat, place.administrative_region.coord.lon);
    }
    getAdminPlace(name) {
        return this.placesRequest(name)
            .pipe(map((response) => response.places.filter((item) => item.embedded_type === 'administrative_region')));
    }
    journeyRequest(f, t, dt) {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.sncfToken
            }),
            params: { from: f, to: t, datetime: dt, min_nb_journeys: '10', datetime_represents: 'departure' }
        };
        this.httpClient
            .get('https://api.sncf.com/v1/coverage/sncf/journeys', httpOptions)
            .pipe(map((response) => response.journeys
            .map(j => j.sections.filter((sec) => sec.type === 'public_transport'))))
            .subscribe((response) => {
            this.dataJourney = response;
            this.emitDataJourneySubject();
        }, (error) => {
            console.log('error' + error);
        });
    }
    placesRequest(name) {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.sncfToken
            }),
            params: { q: name }
        };
        return this.httpClient
            .get('https://api.sncf.com/v1/coverage/sncf/places', httpOptions);
    }
    priceCalcul(dist, symbol) {
        const httpOptions = {
            params: { distance: dist, symbol }
        };
        return this.httpClient
            .get('https://prixservice-3r2xmf6xrq-ew.a.run.app/', httpOptions);
    }
};
SncfService = __decorate([
    Injectable()
], SncfService);
export { SncfService };
//# sourceMappingURL=sncf.service.js.map