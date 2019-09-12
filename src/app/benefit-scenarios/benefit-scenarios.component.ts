import { Component, OnInit, Input } from '@angular/core';
import { BenefitScenario } from '../BenefitScenario';
import {AddScenarioModalComponent} from '../add-scenario-modal/add-scenario-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-benefit-scenarios',
  templateUrl: './benefit-scenarios.component.html',
  styleUrls: ['./benefit-scenarios.component.sass']
})
export class BenefitScenariosComponent implements OnInit {
  
  @Input() benefitScenarios: BenefitScenario[];
  selectedScenario: BenefitScenario;
  NewScenario: BenefitScenario;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.NewScenario = {StopWork: "", StartBenefit: "", BenefitValue: 0};
  }
  
  
  onSelect(scenario: BenefitScenario): void {
    this.selectedScenario = scenario;
  }
  
  onDelete(scenario: BenefitScenario): void {
    const index: number = this.benefitScenarios.indexOf(scenario);
    if (index !== -1) {
        this.benefitScenarios.splice(index, 1);
    }      
  }
  
  openModal()
  {
    const modalRef = this.modalService.open(AddScenarioModalComponent);
    modalRef.componentInstance.NewScenario = this.NewScenario;
    
    modalRef.result.then((result) => {
      if (result) {
        this.AddNewEntry();
        this.NewScenario = {StopWork: "", StartBenefit: "", BenefitValue: 0};
      }
  });
  }
  
  AddNewEntry()
  {
    this.benefitScenarios.push(this.NewScenario);
  }
  
  Clear()
  {
    this.benefitScenarios = [];
  }
}
