import { Component, OnInit } from '@angular/core';
import { ContriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesServices: ContriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStrore.byCountries.countries;
    this.initialValue = this.countriesServices.cacheStrore.byCountries.term;
  }

  searchByCountries(country: string) {
    this.countriesServices.searchCountry(country).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
