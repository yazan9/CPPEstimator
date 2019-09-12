import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-categories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.sass']
})
export class CategoriesManagerComponent implements OnInit {

  @Input() public Categories: Category[]

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  Save()
  {
    this.activeModal.close(this.Categories);
  }
}
