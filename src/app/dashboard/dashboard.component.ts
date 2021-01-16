import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import * as ingreEgresoActions from '../ingreso-egreso/ingresoEgreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userSubs$: Subscription;
  public ingresoEgresoSubs$: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs$ = this.store
      .select('user')
      .pipe(
        filter((auth) => {
          return auth.user != null;
        })
      )
      .subscribe((user) => {
        this.ingresoEgresoSubs$ = this.ingresoEgresoService
          .initIngresoEgresos(user.user.uid)
          .subscribe((items) => {
            // console.log({ items });
            this.store.dispatch(ingreEgresoActions.setItem({ items: items }));
          });
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs$?.unsubscribe();
    this.userSubs$?.unsubscribe();
  }
}
