import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      '2010', '2011', '2012',
      '2013', '2014', '2015',
      '2016', '2017', '2018',
    ];
  }

  getMonths() {
    return [
      'Ene', 'Feb', 'Mar',
      'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep',
      'Oct', 'Nov', 'Dic',
    ];
  }

  getWeeks() {
    return [
      'Lun',
      'Mar',
      'Mie',
      'Jue',
      'Vie',
      'Sab',
      'Dom',
    ];
  }
}
