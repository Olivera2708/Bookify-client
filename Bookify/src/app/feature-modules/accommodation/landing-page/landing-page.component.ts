import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from '@angular/router';
import {SearchResultsService} from "../SearchResultService";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  search: string;
  persons: string;
  dateBegin: string;
  dateEnd: string;

  constructor(private accommodationService: AccommodationService, private router: Router,  private searchResultsService: SearchResultsService) {}

  ngOnInit(): void {
    this.searchResultsService.accommodations = undefined;
  }
  handleButtonPress(values: { search: string; persons: number, dateBegin: string, dateEnd: string}): void {
    this.search = values.search;
    this.persons = values.persons.toString();
    this.dateBegin = values.dateBegin;
    this.dateEnd = values.dateEnd;

    this.router.navigate(['/results', {"search": this.search, "persons": this.persons, "begin": this.dateBegin, "end": this.dateEnd}]);
  }
}
