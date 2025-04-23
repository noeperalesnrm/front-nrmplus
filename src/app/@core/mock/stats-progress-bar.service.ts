import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Visitas Totales',
      value: 2900,
      activeProgress: 70,
      description: 'Mejor que la semana pasada (70%)',
    },
    {
      title: 'Nuevos Registros',
      value: 378,
      activeProgress: 30,
      description: 'Mejor que la semana pasada (30%)',
    },
    {
      title: 'Registros Parciales',
      value: 21,
      activeProgress: 55,
      description: 'Peor que la semana pasada (55%)',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
