import { Component, OnInit } from '@angular/core';
import { ContriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: ContriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStrore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStrore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
