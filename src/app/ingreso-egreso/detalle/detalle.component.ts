import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egresos';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  public ingresosEgresos: IngresoEgreso[] = [];
  public ingresoSubs$: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresoSubs$ = this.store
      .select('ingresoEgreso')
      .pipe(
        filter((ingresoEgreso) => {
          return ingresoEgreso.items != null;
        })
      ).subscribe((ingresoEgreso) => {
        this.ingresosEgresos = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.ingresoSubs$.unsubscribe();
  }

  borrar(item) {
    this.ingresoEgresoService
      .deleteIngresoEgreso(item.uid)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch((err) => Swal.fire('Error', err.message, 'error'));
  }
}
