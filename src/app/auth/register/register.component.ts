import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formulario: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  createUser(){
   console.log(this.formulario);
   if (this.formulario.invalid) {
     return;
   }
   const { nombre, email, password} =  this.formulario.value
   this.authService.crearUser(nombre, email, password).then((credenciales) =>{
    console.log({credenciales});
    this.router.navigate(['/'])
  }).catch(e=>{console.error(e);})
  }

  get registerForm(){
    return this.formulario.controls;
  }
}
