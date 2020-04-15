import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Beer } from '../models/beer';



 

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.uri)
      .pipe(
        tap(_ => this.log('fetched beers')),
        catchError(this.handleError<Beer[]>('getBeers', []))
      );
  }

  searchBeers(term: string): Observable<Beer[]> {
    if (!term.trim()) {
      // if not search term, return empty Beer array.
      return of([]);
    }
    return this.http.get<Beer[]>(`${this.uri}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Beers matching "${term}"`) :
         this.log(`no Beers matching "${term}"`)),
      catchError(this.handleError<Beer[]>('searchBeers', []))
    );
  }

  getBeersByCountry(country: string): Observable<Beer[]> {
    const url = `${this.uri}/?country=${country}`;
    return this.http.get<Beer[]>(url)
    .pipe(
      map(beers => beers[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} beer country=${country}`);
      }),
      catchError(this.handleError<Beer>(`getBeersByCountry country=${country}`))
    );
  }

  getBeersByType(type: string): Observable<Beer[]> {
    const url = `${this.uri}/?type=${type}`;
    return this.http.get<Beer[]>(url)
    .pipe(
      map(beers => beers[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        console.error(`${outcome} beer type=${type}`);
      }),
      catchError(this.handleError<Beer[]>(`getBeersBytype type=${type}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message); // log to console instead
  }
}
