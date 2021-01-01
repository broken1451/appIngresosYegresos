import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';



export const dashboardroutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent },
];


// @NgModule({
//     imports: [RouterModule.forChild(dashboardroutes)],
//     exports: [RouterModule]
// })
// export class dashboardroutesRoutingModule {}
