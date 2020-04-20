export interface Beers {
    numberOfPages: number;
    beers: Beer[];
}

export interface Beer {
    id: number;
    name: string;
    country: string;
    type: string;
    styleId: number;
    breweries: Brewery[];
}

export interface Brewery {
    id: string;
    countryCode: string;
}
