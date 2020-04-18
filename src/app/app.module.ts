import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SncfService } from './services/sncf.service';
import { SoapService } from './services/soap.service';
import { DataService } from './services/data.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { AccueilComponent } from './accueil/accueil.component';
import { VoyageComponent } from './voyage/voyage.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  { path: '', component: AccueilComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    VoyageComponent,
    AccueilComponent,
    VoyageComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    MatSelectModule
  ],
  providers: [
    SncfService,
    SoapService,
    DataService,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
