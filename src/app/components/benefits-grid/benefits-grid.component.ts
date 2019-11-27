import { Component, OnInit, Input } from '@angular/core';
import { BenefitScenario } from 'src/app/BenefitScenario';
import { Profile } from 'src/app/Models/Profile';
import { CalculatorService } from 'src/app/services/calculator.service';
import * as moment from 'moment';

class SimplifiedScenario {
  StopWork: string;
  StartBenefits: string;
  value: number;
}

@Component({
  selector: 'app-benefits-grid',
  templateUrl: './benefits-grid.component.html',
  styleUrls: ['./benefits-grid.component.sass']
})
export class BenefitsGridComponent implements OnInit {
  AllScenarios: BenefitScenario[];
  SimplifiedScenarios: SimplifiedScenario[];
  DisplayedScenarios: SimplifiedScenario[][];
  Profile: Profile;
  DateOfBirth: Date;
  renderGrid = false;

  constructor(private calculatorService: CalculatorService,) { 
    this.AllScenarios = [];
    this.SimplifiedScenarios = [];
    this.DisplayedScenarios = [];
  }

  ngOnInit() {
    this.Profile = JSON.parse(localStorage.getItem('Profile'));
    this.DateOfBirth = new Date(this.Profile.DateOfBirth);
    this.generateGridValues();
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  generateGridValues():void{
    //Make a copy of the profile
    let profileToSend = this.copyProfile();
    this.calculatorService.getGridScenarios(profileToSend).subscribe(
      (values => {
            this.AllScenarios.forEach((scenario, index) => {
              scenario.BenefitValue = values[index];
            });
          this.simplifyScenarios();
          this.reformatScenarios();
          })
    );
  }

  simplifyScenarios(){
    for(let scenario of this.AllScenarios)
    {
      let simplifiedScenario: SimplifiedScenario = new SimplifiedScenario();
      simplifiedScenario.StopWork = scenario.StopWork.getFullYear().toString();
      simplifiedScenario.StartBenefits = scenario.StartBenefit.getFullYear().toString();
      simplifiedScenario.value = simplifiedScenario.StopWork > simplifiedScenario.StartBenefits? 0: scenario.BenefitValue;

      this.SimplifiedScenarios.push(simplifiedScenario);
    }
    this.renderGrid = true;
  }

  reformatScenarios()
  {
    let groupedByStopWork = this.groupBy(this.SimplifiedScenarios, scenario => scenario.StopWork);
    for(let i = (this.DateOfBirth.getFullYear() + 55); i<=this.DateOfBirth.getFullYear() + 70; i++)
    {
      this.DisplayedScenarios.push(groupedByStopWork.get(i.toString()));
    }
  }

  copyProfile(): Profile
  {
    let profile: Profile = new Profile();
    profile.Name = this.Profile.Name;
    profile.DateOfBirth = this.Profile.DateOfBirth;
    profile.DisabilityPeriods = this.Profile.DisabilityPeriods;
    profile.Children = this.Profile.Children;
    profile.Earnings = this.Profile.Earnings;
    profile.Scenarios = this.generateGridScenarios();

    return profile;
  }

  generateGridScenarios(): BenefitScenario[]
  {
    for(let i = 55; i <= 70; i++)
    {
      for(let j = 60; j<=70; j++)
      {
        let scenario: BenefitScenario = new BenefitScenario();
        let stopWorkMoment = moment(this.DateOfBirth.toISOString());
        scenario.StopWork = stopWorkMoment.add(i, 'years').toDate();
        let startBenefitsMoment = moment(this.DateOfBirth).add(1, 'month');
        scenario.StartBenefit = startBenefitsMoment.add(j, 'years').toDate();
        scenario.BenefitValue = 0;
        this.AllScenarios.push(scenario);
      }
    }
    return this.AllScenarios;
  }
}
