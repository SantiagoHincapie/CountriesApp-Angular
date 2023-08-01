import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesServices: ContriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesServices.serachCountrieByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');

        return (this.country = country);
      });
  }

  searchCountry(code: string) {
    this.countriesServices
      .serachCountrieByAlphaCode(code)
      .subscribe((country) => {
        console.log({ country });
      });
  }
}
