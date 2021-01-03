import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      title: 'Cerrando session Espere por favor!',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.authService.logout().then((val) => {
        console.log({ val });
        Swal.close();
        this.router.navigate(['/login']);
      });
    }, 2000);
  }
}
