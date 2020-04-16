import { Component, OnInit } from '@angular/core';

import { Beers } from '../mock-beers';
import { Beer } from '../models/beer';
import { BeerService } from '../services/beer.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  beers: Observable<Beer[]>;
  searchName: string;
  beerService: BeerService;

  constructor(beerService: BeerService) {
    this.beerService = beerService;
  }

  async ngOnInit() {
    debugger;
    this.beers = await this.beerService.getBeers();
  }

  async onSearch(): Promise<void> {
    this.beers = await this.beerService.searchBeers(this.searchName);
  }
}
