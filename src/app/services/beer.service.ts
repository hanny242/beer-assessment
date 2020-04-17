import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Beer } from '../models/beer';
import { Style } from '../models/style';


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  uri = 'http://localhost:4000/beers';

  constructor(private http: HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.uri)
    .pipe(
      retry(1),
      catchError(this.handleError));
  }

  getStyles(): Observable<Style[]> {
    const url = 'http://localhost:4000/styles';
    return this.http.get<Style[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError));
  }

  searchBeers(term: string): Observable<Beer[]> {
    if (!term.trim()) {
      // if not search term, return empty Beer array.
      return of([]);
    }

    return this.http.get<Beer[]>(`${this.uri}?name=${term}`).pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  getBeersByCountry(country: string): Observable<Beer[]> {
    const url = `${this.uri}?country=${country}`;
    return this.http.get<Beer[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  getBeersByStyle(id: number): Observable<Beer[]> {
    const url = `http://localhost:4000/beers?styleId=${id}`;
    return this.http.get<Beer[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
  );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
