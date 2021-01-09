import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formulario: FormGroup;
  public loading: boolean = false;
  public subcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.subcription = this.store.select('ui').subscribe((ui) => {
      if (ui.isLoading) {
        this.loading = ui.isLoading;
        this.loading = false;
      } else {
        this.loading = ui.isLoading;
      }
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  createUser() {
    console.log(this.formulario);
    if (this.formulario.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    // loading
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { nombre, email, password } = this.formulario.value;
    this.authService
      .crearUser(nombre, email, password)
      .then((credenciales) => {
        console.log({ credenciales });
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((e) => {
        console.error(e);
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        });
      });
  }

  get registerForm() {
    return this.formulario.controls;
  }
}
