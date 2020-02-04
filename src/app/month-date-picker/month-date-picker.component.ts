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
  years: string[] = [];

  selectedYear:string;
  selectedStringMonth:string;
  selectedNumericalMonth:number;
  selectedMonth:string;

  @Output() dateSelected = new EventEmitter();
  @Input() label:string;
  @Input() disabled:boolean;
  @Input() formattedDate:string = '';
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

    for(let i = 1900 ; i <= 2100 ; i++){
      this.years.push(i.toString());
    }
    this.selectedYear = this.formattedDate === '' ? moment().year().toString() : moment(this.formattedDate).year().toString();
    this.selectedStringMonth = this.formattedDate === '' ? this.months[moment().month()] : this.months[moment(this.formattedDate).month()];
    this.selectedNumericalMonth = this.formattedDate === '' ? moment().month() : moment(this.formattedDate).month();
  }

  changeYear(val : string){
    this.selectedYear = val;
    let formattedDate = this.selectedYear + '-' + this.selectedMonth;
    this.dateSelected.emit(formattedDate);
    this.showPicker = false;
    this.formattedDate = formattedDate;
  }

  changeMonth(val: string){
    let monthIndex = this.months.findIndex((m)=> m === val) + 1;
    this.selectedMonth = monthIndex.toString().length == 1? '0'+ monthIndex.toString() : monthIndex.toString();
  }
}