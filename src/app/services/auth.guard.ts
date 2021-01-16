import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((state) => {
        if (!state) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe estar autenticado!',
          });
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((state) => {
        if (!state) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe estar autenticado!',
          });
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
