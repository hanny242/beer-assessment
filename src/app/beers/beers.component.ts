import { Component, OnInit } from '@angular/core';

import { Beer } from '../models/beer';
import { Style } from '../models/style';
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
  searchName: string;
  styleValue: string;
  beerService: BeerService;

  constructor(beerService: BeerService) {
    this.beerService = beerService;
  }

  async ngOnInit() {
    this.beers = await this.beerService.getBeers();
    this.styles = await this.beerService.getStyles();
  }

  async onSearch(): Promise<void> {
    this.beers = this.beerService.searchBeers(this.searchName);
  }

  async onStyleSelect(): Promise<void> {
    const styleId = await this.getStyleByName(this.styleValue);

    this.beers = await this.beerService.getBeersByStyle(styleId);
  }

  async getStyleByName(name: string): Promise<number> {
     return await this.styles.pipe(map(styles => {
        const style = styles.filter(s => s.name === name);
        return (style.length > 0) ? style[0].id : null;
      })).toPromise();
  }
}
