import { Component, OnInit } from '@angular/core';
import { ContriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europa', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesServices: ContriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStrore.byRegion.countries;
    this.selectedRegion = this.countriesServices.cacheStrore.byRegion.region;
  }

  searchByRegion(region: Region) {
    this.selectedRegion = region;
    this.countriesServices.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
