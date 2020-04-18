import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DataService = class DataService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    saveJourney(body) {
        return this.httpClient
            .post('https://trouvetontrain-267507.firebaseio.com/journeys.json', body);
    }
    getSavedJourneys() {
        return this.httpClient
            .get('https://trouvetontrain-267507.firebaseio.com/journeys.json');
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map