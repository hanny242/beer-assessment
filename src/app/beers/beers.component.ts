import { Component, OnInit } from '@angular/core';

import { Beers } from '../models/beer';
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
  beers: Observable<Beers>;
  beerList: Observable<Beer[]>;
  styles: Observable<Style[]>;
  countries: Observable<Country[]>;
  pageNumber: number;
  searchName: string;
  selectedStyleId: number;
  selectedCountryCode: string;
  beerService: BeerService;
  config: any;



  constructor(beerService: BeerService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 50,

    }
    this.beerService = beerService;
    this.selectedStyleId = -1;
    this.selectedCountryCode = 'placeholder';
  }

  async ngOnInit() {
    this.beers = this.beerService.getBeers(1);
    this.beerList = this.beerService.getBeers(1);
    this.styles = this.beerService.getStyles();
    this.countries = this.beerService.getCountries();
  }

  onPageSelect(): void{
    this.beers = this.beerService.getBeers(this.pageNumber);
  }

  onSearch(): void {
    this.beerList = this.beerService.searchBeers(this.searchName);
  }

  onStyleSelect(): void {
    this.beerList = this.beerService.getBeersByStyle(this.selectedStyleId);
    this.selectedCountryCode = 'placeholder';
  }

  onCountrySelect(): void {
    this.beerList = this.beerService.getBeersByCountry(this.selectedCountryCode);
    this.selectedStyleId = -1;
  } 
}
