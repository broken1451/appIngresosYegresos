import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egresos';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateIngresoEgreso } from '../ingresoEgreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  public ingresos: number = 0;
  public egresos: number = 0;
  public totalEgresos: number = 0;
  public totalIgresos: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  // public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateIngresoEgreso>) {}

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => {
      console.log({ ingresoEgreso });
      this.generarEstadistica(ingresoEgreso.items);
    });
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    for (const item of items) {
      if (item.tipo == 'ingreso') {
        this.totalIgresos = this.totalIgresos + item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos = this.totalEgresos + item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData = [[this.totalIgresos, this.totalEgresos]];
  }
}
