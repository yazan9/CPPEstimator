import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { BenefitScenariosComponent } from './benefit-scenarios/benefit-scenarios.component';
import { EarningsComponent } from './earnings/earnings.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddScenarioModalComponent } from './add-scenario-modal/add-scenario-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    PersonalDetailsComponent,
    BenefitScenariosComponent,
    EarningsComponent,
    AddScenarioModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
  entryComponents: [AddScenarioModalComponent]
})
export class AppModule { }
