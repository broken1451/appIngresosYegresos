import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/usuario.model';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAction from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingresoEgreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public subcription: Subscription;
  private _user: User;

  constructor(
    private store: Store<AppState>,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // @function metodo para obtener la informacion del usuario de firebase
  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      // console.log(fuser);
      // console.log(fuser?.uid);
      // console.log(fuser?.email);
      if (fuser) {
        this.subcription = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            // console.log({ firestoreUser });
            const user = User.fromFireStore(firestoreUser);
            this._user = user;
            this.store.dispatch(authAction.setUser({ user: user }));
          });
      } else {
        // no existe
        this.subcription.unsubscribe();
        this.store.dispatch(authAction.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItem());
        this._user = null;
      }
    });
  }

  crearUser(nombre: string, email: string, password: string) {
    // return this.auth.createUserWithEmailAndPassword(email, password).then(({}) => {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, nombre, user.email);
        // this.firestore.doc(`path donde quiero guardar`)
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map((user) => {
        //  if (user != null ){
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  get user() {
    return this._user;
  }
}
