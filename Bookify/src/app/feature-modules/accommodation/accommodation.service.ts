import { Injectable } from '@angular/core';
import {AccommodationBasicModel} from "./model/accommodation-basic.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private basicAccommodationList: AccommodationBasicModel[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getForSearch(location: string, dateBegin: Date, dateEnd: Date, persons: number): Observable<AccommodationBasicModel[]> {
    return this.httpClient.get<AccommodationBasicModel[]>(environment.apiHost + 'search' + "?location=${location}&dateBegin=${dateBegin.toISOString()}&dateEnd=${dateEnd.toISOString()}&persons=${persons}")
  }
}
