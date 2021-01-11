import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public subcription: Subscription;
  public nombre: string = '';

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subcription = this.store
      .select('user')
      .pipe(
        filter((user) => {
          return user.user != null;
        })
      )
      .subscribe((user) => {
        this.nombre = user.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Cerrando session Espere por favor!',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.authService.logout().then((val) => {
        Swal.close();
        this.router.navigate(['/login']);
      });
    }, 2000);
  }
}
