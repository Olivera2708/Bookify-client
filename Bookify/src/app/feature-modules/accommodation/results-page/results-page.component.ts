import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {AccommodationBasicModel} from "../model/accommodation-basic.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FilterDTO} from "../model/filter.dto.model";
import {FilterComponent} from "../../../layout/filter/filter.component";

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ResultsPageComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  accommodationModels: AccommodationBasicModel[]
  search: string;
  persons: number;
  dateBegin: Date;
  dateEnd: Date;
  currentPage = 1;
  pageSize = 5;
  allResults: number;
  sort: string = "";
  filter: FilterDTO = {maxPrice: -1, minPrice: -1, filters: [], types: ["HOTEL", "APARTMENT", "ROOM"]}

  constructor(private accommodationService: AccommodationService, private route: ActivatedRoute, private router: Router) {}

  onSortChange() {
    this.currentPage = 1;
    this.paginator.pageIndex = 0;
    this.getSortAndFilterResults();
  }

  getSortAndFilterResults(){
    this.accommodationService.getForFilterAndSort(this.search, this.dateBegin, this.dateEnd, this.persons, this.currentPage-1, this.pageSize, this.sort, this.filter).subscribe({
      next: (data) => {
        this.accommodationModels = data.accommodations;
        this.allResults = data.results;
      },
      error: (_) => {
        console.log("Error occurred!");
      }
    });
  }

  getResults() {
    this.accommodationService.getForSearch(this.search, this.dateBegin, this.dateEnd, this.persons, this.currentPage-1, this.pageSize).subscribe({
      next: (data) => {
        this.accommodationModels = data.accommodations;
        this.allResults = data.results;
        this.filterComponent.minPossiblePrice = data.minPrice;
        this.filterComponent.minPrice = data.minPrice;
        this.filterComponent.maxPossiblePrice = data.maxPrice;
        this.filterComponent.maxPrice = data.maxPrice;
      },
      error: (_) => {
        console.log("Error occurred!");
      }
    });
  }

  onPageChange(event: PageEvent) {
    if (this.pageSize != event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;
    }
    if (this.currentPage != event.pageIndex + 1) {
      this.currentPage = event.pageIndex + 1;

      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    }
    const array: Array<string> = ['Name', 'Lowest', 'Highest'];
    if (array.indexOf(this.sort) != -1 || this.filter.maxPrice != -1 || this.filter.filters.length != 0 || this.filter.types.length != 0)
      this.getSortAndFilterResults();
    else
      this.getResults();
  }

  ngOnInit(): void {
    this.search = <string>this.route.snapshot.params['search'];
    this.persons = Number(this.route.snapshot.params['persons']);
    this.dateBegin = new Date(Date.parse(<string>this.route.snapshot.params['begin']));
    this.dateEnd = new Date(Date.parse(<string>this.route.snapshot.params['end']));

    this.getResults();
  }

  filterPress(filter: FilterDTO){
    this.currentPage = 1;
    this.paginator.pageIndex = 0;
    this.filter = filter;
    this.getSortAndFilterResults();
  }

  searchPress(values: { search: string; persons: number, dateBegin: string, dateEnd: string}): void {
    this.persons = values.persons;
    this.search = values.search;
    this.dateBegin = new Date(Date.parse(values.dateBegin));
    this.dateEnd = new Date(Date.parse(values.dateEnd));

    this.paginator.pageIndex = 0;
    this.currentPage = 1;

    this.filter = {maxPrice: -1, minPrice: -1, filters: [], types: ["HOTEL", "APARTMENT", "ROOM"]}
    this.filterComponent.resetFilter();
    this.sort = "";
    this.getResults();

    this.router.navigate(['/results', {"search": values.search, "persons": values.persons, "begin": values.dateBegin, "end": values.dateEnd}]);
  }
}
