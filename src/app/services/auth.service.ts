import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) {}

  // @function metodo para obtener la informacion del usuario de firebase
  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });
  }

  crearUser(nombre: string, email: string, password: string) {
    // return this.auth.createUserWithEmailAndPassword(email, password).then(({}) => {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      const newUser = new User(user.uid, nombre, user.email);
      // this.firestore.doc(`path donde quiero guardar`)
      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser})

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
}
