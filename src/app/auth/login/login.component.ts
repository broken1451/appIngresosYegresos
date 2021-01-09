import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public subcription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

  get formLogin() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
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

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .then((credenciales) => {
        console.log({ credenciales });
        // cancel aca
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
}
