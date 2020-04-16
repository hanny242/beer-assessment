import { Component, OnInit } from '@angular/core';

import { BEERS } from '../mock-beers';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {

  beers = BEERS;

  constructor() { }

  ngOnInit(): void {
  }

}
