import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egresos';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    // agregar collection a un documento

    delete ingresoEgreso.uid;

    // this.angularFirestore.doc(`${id del usuario}/ingresos-egresos - path donde se hace a refrerencia a firebase`).collection('nombre colleccion');
    return this.angularFirestore
      .doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresoEgresos(uid: string) {
    return (
      this.angularFirestore
        .collection(`${uid}/ingresos-egresos/items`)
        // .valueChanges()
        .snapshotChanges()
        .pipe(
          map((items: any) => {
            return items.map((items) => {
              // const data: {} = items.payload.doc.data();
              return {
                uid: items.payload.doc.id,
                // ...data
                ...(items.payload.doc.data() as {}),
                // ...(items.payload.doc.data() as any),
              };
            });
          })
        )
    );
  }

  deleteIngresoEgreso(idItem: string) {
    return this.angularFirestore
      .doc(`${this.authService.user.uid}/ingresos-egresos/items/${idItem}`)
      .delete();
  }
}
