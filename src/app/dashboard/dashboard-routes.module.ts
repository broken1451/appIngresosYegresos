import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardroutes } from './dashboard.routes';
import { AuthGuard } from '../services/auth.guard';

const routesChild: Routes = [
    {
    path: '',
    component: DashboardComponent,
    children: dashboardroutes,
    // canActivate: [AuthGuard]
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesChild)
  ],
  exports:[RouterModule]
})
export class DashboardRoutesModule { }
