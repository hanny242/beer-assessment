import { Component, OnInit } from '@angular/core';
import { Beer } from '../models/beer';
import { Style } from '../models/style';
import { Country } from '../models/country';
import { BeerService } from '../services/beer.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  beers: Observable<Beer[]>;
  beerList: Observable<Beer[]>;
  styles: Observable<Style[]>;
  countries: Observable<Country[]>;
  pageNumber: number = 1;
  searchName: string;
  selectedStyleId: number;
  selectedCountryCode: string;
  beerService: BeerService;



  constructor(beerService: BeerService) {
    
    this.beerService = beerService;
    this.selectedStyleId = -1;
    this.selectedCountryCode = 'default';
  }

  async ngOnInit() {
    this.beers = this.beerService.getBeers(1);
    this.styles = this.beerService.getStyles();
    this.countries = this.beerService.getCountries();
  }

  onPageSelect(): void{
    this.beers = this.beerService.getBeers(this.pageNumber);
  }

  onSearch(): void {
    if(this.searchName === '') {
      this.beers = this.beerService.getBeers(1);
    }
    else {
      this.beers = this.beerService.searchBeers(this.searchName);
    }
  }

  onStyleSelect(): void {
    if(this.selectedStyleId === -1) {
      this.beers = this.beerService.getBeers(1); 
    }
    else {
      this.pageNumber = 1;
      this.beers = this.beerService.getBeersByStyle(this.selectedStyleId, this.pageNumber);
    }
    this.selectedCountryCode = 'default';
  }

  onCountrySelect(): void {
    if(this.selectedCountryCode === 'default') {
      this.beers = this.beerService.getBeers(1);
    }
    else {
      this.pageNumber = 1;
      this.beers = this.beerService.getBeersByCountry(this.selectedCountryCode, this.pageNumber);
    }
    this.selectedStyleId = -1;
  } 

  nextPage(): void {
    this.pageNumber++;

    if(this.selectedStyleId != -1) {
      this.beers = this.beerService.getBeersByStyle(this.selectedStyleId, this.pageNumber)
    }
    else if (this.selectedCountryCode != 'default')
    {
      this.beers = this.beerService.getBeersByCountry(this.selectedCountryCode, this.pageNumber);
    }
    else {
      this.beers = this.beerService.getBeers(this.pageNumber);
    }
  }
  previousPage(): void {
    this.pageNumber--;
    
    if(this.selectedStyleId != -1) {
      this.beers = this.beerService.getBeersByStyle(this.selectedStyleId, this.pageNumber)
    }
    else if (this.selectedCountryCode != 'default')
    {
      this.beers = this.beerService.getBeersByCountry(this.selectedCountryCode, this.pageNumber);
    }
    else{this.beers = this.beerService.getBeers(this.pageNumber);}
  }
}
