import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainFormServiceService {
  
  // Observable string sources
  private DateOfBirthSource = new Subject<string>();
  
  // Observable string streams
  DateOFBirth$ = this.DateOfBirthSource.asObservable();
  
  // Service Commands
  SetDateOfBirth(DOB: string)
  {
    this.DateOfBirthSource.next(DOB);
  }

  constructor() { }
}
