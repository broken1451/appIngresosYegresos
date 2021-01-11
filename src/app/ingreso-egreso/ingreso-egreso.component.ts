import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egresos';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss'],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public ingresoEgresoForm: FormGroup;
  public tipo: string = '';
  public loading: boolean = false;
  public subcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.tipo = 'ingreso';
    this.loading = false;
    this.subcription = this.store.select('ui').subscribe((ui) => {
      // console.log({ ui });
      // if (ui.isLoading) {
      this.loading = ui.isLoading;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1000);
      // this.loading = false;
      // } else {
      // this.loading = ui.isLoading;
      // }
    });
  }

  ngOnDestroy() {
    this.loading = false;
    this.subcription.unsubscribe();
  }

  guardar() {
    // setTimeout(() => {
    //   // cancel loading
    //   console.log('acaaaa')
    //   this.loading = false;
    //   // this.store.dispatch(ui.stopLoading());

    // }, 2500);

    if (this.ingresoEgresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    const { descripcion, monto } = this.formIngresoEgreso;

    const ingresoEgreso = new IngresoEgreso(
      descripcion.value,
      monto.value,
      this.tipo
    );

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        Swal.fire('Registro Creado', descripcion.value, 'success');
        // this.ingresoEgresoForm.patchValue({
        //   descripcion: '',
        //   monto: ''
        // });
        this.ingresoEgresoForm.reset();
        this.loading = false;
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        console.warn(err);
        Swal.fire('Error', err.message, 'error');
        this.loading = false;
        this.store.dispatch(ui.stopLoading());
      });
  }

  get formIngresoEgreso() {
    return this.ingresoEgresoForm.controls;
  }
}
