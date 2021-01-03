import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    console.log(this.formulario);
    if (this.formulario.invalid) {
      return;
    }

    // loading
    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { nombre, email, password } = this.formulario.value;
    this.authService
      .crearUser(nombre, email, password)
      .then((credenciales) => {
        console.log({ credenciales });
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((e) => {
        console.error(e);
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
