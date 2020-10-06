import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText: string;
  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
  }

  setSearchTerm() : void {
    this.searchService.setSearchQuery(this.searchText);
  }
}
