import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { CalculatorService } from '../services/calculator.service';
import { Profile } from '../Models/Profile';

@Component({
  selector: 'month-date-picker-inline',
  templateUrl: './month-date-picker-inline.component.html',
  styleUrls: ['./month-date-picker-inline.component.sass']
})
export class MonthDatePickerInlineComponent implements OnInit {

  showPicker:boolean = false;

  months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  years: string[] = [];

  selectedYear:string;
  selectedStringMonth:string;
  selectedNumericalMonth:number;
  selectedMonth:string;

  @Output() dateSelected = new EventEmitter();
  @Input() label:string;
  @Input() disabled:boolean;
  @Input() formattedDate:string = '';
  @Input() futureYearsOnly:boolean = false;
  profileSubscription: Subscription;

  constructor(private CalculatorService: CalculatorService){}

  ngOnInit(){
    this.profileSubscription = this.CalculatorService.ProfileLoaded$.subscribe((profile:Profile) => {
      if(this.CalculatorService.isValidDateOfBirth())
        this.formattedDate = moment(profile.DateOfBirth).format('YYYY-MM');
      else{
        this.formattedDate = '';
      }
    })

    let initialYear:number = this.futureYearsOnly ? moment().year() : 1900;
    for(let i = initialYear ; i <= 2100 ; i++){
      this.years.push(i.toString());
    }
    this.selectedYear = this.formattedDate === '' ? null : moment(this.formattedDate).year().toString();
    this.selectedStringMonth = this.formattedDate === '' ? null : this.months[moment(this.formattedDate).month()];
    this.selectedNumericalMonth = this.formattedDate === '' ? moment().month() : moment(this.formattedDate).month();
  }

  changeYear(val : string){
    this.selectedYear = val;
    this.emitDate();    
  }

  changeMonth(val: string){
    let monthIndex = this.months.findIndex((m)=> m === val) + 1;
    this.selectedMonth = monthIndex.toString().length == 1? '0'+ monthIndex.toString() : monthIndex.toString();
    this.emitDate();
  }

  emitDate(){
    if(this.selectedMonth && this.selectedYear){
      let formattedDate = this.selectedYear + '-' + this.selectedMonth;
      this.dateSelected.emit(formattedDate);
      this.formattedDate = formattedDate;
    }
  }
}
