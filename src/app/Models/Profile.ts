import { Earning } from '../Earning';
import { BenefitScenario } from '../BenefitScenario';
import { DisabilityPeriod } from './DisabilityPeriod';
import { Child } from './Child';

export class Profile {
    DateOfBirth: Date;
    Scenarios: BenefitScenario[];
    Name: string;
    Earnings: Earning[];
    DisabilityPeriods: DisabilityPeriod[];
    Children:Child[];
    Id:number;
    ProfileName:string;

    constructor()
    {
        this.DateOfBirth = new Date();
        this.Scenarios = [];
        this.Name = "";
        this.Earnings = [];
        this.DisabilityPeriods = [];
        this.Children = [];
        this.Id = -1;
        this.ProfileName = "";
    }
}