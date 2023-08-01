import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/countries';
import { CacheStrore } from '../interfaces/cah-strore-interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class ContriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public cacheStrore: CacheStrore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStrore));
  }

  private loadToLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStrore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))
      /* delay(2000) */
    );
  }

  serachCountrieByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byCapital = { term, countries })),
      tap(() => this.saveLocalStorage())
    );
  }
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byCountries = { term, countries })),
      tap(() => this.saveLocalStorage())
    );
  }
  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byRegion = { region, countries })),
      tap(() => this.saveLocalStorage())
    );
  }
}
