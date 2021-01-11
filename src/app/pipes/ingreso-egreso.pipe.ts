import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egresos';

@Pipe({
  name: 'ingresoEgreso',
})
export class IngresoEgresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        console.log({ a, b });
        return -1;
      } else {
        return 1;
      }
    });
  }
}
