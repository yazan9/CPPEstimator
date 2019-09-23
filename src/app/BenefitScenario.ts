export class BenefitScenario {
  StopWork: Date;
  StartBenefit: Date;
  BenefitValue: number;

  constructor(){
    this.StopWork = null;
    this.StartBenefit = null;
    this.BenefitValue = 0;
  }
}