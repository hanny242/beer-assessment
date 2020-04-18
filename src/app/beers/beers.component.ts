import { Component, OnInit } from '@angular/core';

import { Beer } from '../models/beer';
import { Style } from '../models/style';
import { Country } from '../models/country';
import { BeerService } from '../services/beer.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  beers: Observable<Beer[]>;
  styles: Observable<Style[]>;
  countries: Observable<Country[]>;
  searchName: string;
  selectedStyleId: number;
  selectedCountryCode: string;
  beerService: BeerService;

  constructor(beerService: BeerService) {
    this.beerService = beerService;    
    this.selectedStyleId = -1;
    this.selectedCountryCode = "placeholder";
  }

  async ngOnInit() {
    this.beers = this.beerService.getBeers();
    this.styles = this.beerService.getStyles();
    this.countries = this.beerService.getCountries();
  }

  onSearch(): void {
    this.beers = this.beerService.searchBeers(this.searchName);
  }

  onStyleSelect(): void {
    this.beers = this.beerService.getBeersByStyle(this.selectedStyleId);
  }

  onCountrySelect(): void {
    this.beers = this.beerService.getBeersByCountry(this.selectedCountryCode);
  } 
}
