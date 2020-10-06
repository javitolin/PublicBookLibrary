import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject('');
  currentSearchQuery = this.searchQuerySubject.asObservable();

  constructor() { }

  setSearchQuery(message: string) {
    this.searchQuerySubject.next(message)
  }

}
