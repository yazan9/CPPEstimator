import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CalculatorService } from '../services/calculator.service';
import { Profile } from '../Models/Profile';

@Component({
  selector: 'month-date-picker',
  templateUrl: './month-date-picker.component.html',
  styleUrls: ['./month-date-picker.component.sass']
})
export class MonthDatePickerComponent implements OnInit {

  showPicker:boolean = false;
  months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  selectedYear:string;
  @Output() dateSelected = new EventEmitter();
  @Input() label:string;
  @Input() disabled:boolean;
  @Input() formattedDate:string = '';
  profileSubscription: Subscription;

  constructor(private CalculatorService: CalculatorService){}

  ngOnInit(){
    this.selectedYear = this.formattedDate === '' ? moment().year().toString() : moment(this.formattedDate).year().toString();
    this.profileSubscription = this.CalculatorService.ProfileLoaded$.subscribe((profile:Profile) => {
      if(this.CalculatorService.isValidDateOfBirth())
        this.formattedDate = moment(profile.DateOfBirth).format('YYYY-MM');
      else{
        this.formattedDate = '';
      }
    })
  }

  changeYear(offset: number){
    this.selectedYear = (parseInt(this.selectedYear) + offset).toString();
  }

  selectMonth(index: number){
    let month = (index + 1).toString();
    month = month.length == 1? '0'+month : month;
    let formattedDate = this.selectedYear.toString() + '-' + month;
    this.dateSelected.emit(formattedDate);
    this.showPicker = false;
    this.formattedDate = formattedDate;
  }
}