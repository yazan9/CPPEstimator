import { Earning } from '../Earning';
import { BenefitScenario } from '../BenefitScenario';

export class Profile {
    DateOfBirth: Date;
    Scenarios: BenefitScenario[];
    Name: string;
    Earnings: Earning[];

    constructor()
    {
        this.DateOfBirth = new Date();
        this.Scenarios = [];
        this.Name = "";
        this.Earnings = [];
    }
}