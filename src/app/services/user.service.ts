import { Injectable, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { SortDirection } from '../directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(users: User[], column: string, direction: string): User[] {
  if (direction === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: User, term: string, pipe: PipeTransform) {
  return user.username.toLowerCase().includes(term.toLowerCase())
  || user.email.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class UserService {
  private AdminUrl:string;
  env = environment;

  USERS: User[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient, private authService: AuthenticationService) {
    this.AdminUrl = `${this.env.backendUri}/admin`;
    this.getAllUsers().subscribe( (results) => {
      this.USERS = results;
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._users$.next(result.users);
      this._total$.next(result.total);
    });

    this._search$.next();
  });
  }

  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let users = sort(this.USERS, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm, this.pipe));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }

  getAllUsers(): Observable<User[]>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.get<User[]>(this.AdminUrl+'/', httpOptions);
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  deleteUser(user:User): void
  {
    let httpOptions = {
      headers: this.getHeaders()
    };
    this.http.delete<User>(`${this.AdminUrl}/deleteUser/${user.id}`, httpOptions).subscribe(
      () => {
        const index: number = this.USERS.indexOf(user);
        if (index !== -1) {
          this.USERS.splice(index, 1);
        }
        this._users$.next(this.USERS);
      }
    );
  }

  activateUser(user:User): void
  {   
    const httpOptions = {
      headers: this.getHeaders()
    };
    
    this.http.put<User>(`${this.AdminUrl}/activate/${user.id}`, user, httpOptions).subscribe(
      () => {
        const index: number = this.USERS.indexOf(user);
        if (index !== -1) {
          let updatedUser = this.USERS.find(u => u.id === user.id);
          updatedUser.active = true;
          this.USERS[index] = updatedUser;
        }
        this._users$.next(this.USERS);
      }
    );
  }

  deactivateUser(user:User): void
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    this.http.put<User>(`${this.AdminUrl}/deactivate/${user.id}`, user, httpOptions).subscribe(
      () => {
        const index: number = this.USERS.indexOf(user);
        if (index !== -1) {
          let updatedUser = this.USERS.find(u => u.id === user.id);
          updatedUser.active = false;
          this.USERS[index] = updatedUser;
        }
        this._users$.next(this.USERS);
      }
    );
  }

  promoteUser(user:User): void
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    this.http.put<User>(`${this.AdminUrl}/promote/${user.id}`, user, httpOptions).subscribe(
      () => {
        const index: number = this.USERS.indexOf(user);
        if (index !== -1) {
          let updatedUser = this.USERS.find(u => u.id === user.id);
          updatedUser.admin = true;
          this.USERS[index] = updatedUser;
        }
        this._users$.next(this.USERS);
      }
    );
  }

  demoteUser(user:User): void
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    this.http.put<User>(`${this.AdminUrl}/demote/${user.id}`, user, httpOptions).subscribe(
      () => {
        const index: number = this.USERS.indexOf(user);
        if (index !== -1) {
          let updatedUser = this.USERS.find(u => u.id === user.id);
          updatedUser.admin = false;
          this.USERS[index] = updatedUser;
        }
        this._users$.next(this.USERS);
      }
    );
  }
}
