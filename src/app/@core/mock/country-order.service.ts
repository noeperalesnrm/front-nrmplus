import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { CountryOrderData } from '../data/country-order';

@Injectable()
export class CountryOrderService extends CountryOrderData {

  private countriesCategories = [
    'Takis Fuego',
    'Takis Blue Heat',
    'Takis Huakamoles',
    'Takis Volcano',
    'Takis Original',
  ];
  private countriesCategoriesLength = this.countriesCategories.length;
  private generateRandomData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 20);
    });
  }

  getCountriesCategories(): Observable<string[]> {
    return observableOf(this.countriesCategories);
  }

  getCountriesCategoriesData(country: string): Observable<number[]> {
    return observableOf(this.generateRandomData(this.countriesCategoriesLength));
  }
}
