import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, from as fromPromise, Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { catchError, first, switchMap } from "rxjs/operators";
import { map } from "rxjs/internal/operators";
import { Funcs } from "./funcs.service";

@Injectable({
  providedIn: "root"
})
export class LoggedUserService {
  currentUser: BehaviorSubject<any>;
  $logged: Observable<any>;
  isAuthenticated$: Observable<boolean>;
  public userRef = (id: string): AngularFirestoreDocument<any> =>
    this.afs.doc(`users/${id}`);
  init = (): void => {
    this.currentUser = new BehaviorSubject<any>(null);
    this.isAuthenticated$ = this.afAuth.authState.pipe(map(res => !!res));
    this.$logged = this.afAuth.authState.pipe(
      switchMap(user =>
        user ? this.userRef(user.uid).valueChanges() : of(null)
      ),
      catchError(err => {
        this.functions.handleError(err.message);
        return of(null);
      })
    );
    this.$logged.subscribe(users => this.currentUser.next(users));
  };
  signIn = (username: string, pass: string): Promise<any> =>
    this.afAuth.auth.signInWithEmailAndPassword(username + "@ant.in", pass);
  signUp = (username: string, pass: string): Promise<void> =>
    this.afAuth.auth
      .createUserWithEmailAndPassword(username + "@ant.in", pass)
      .then(response => {
        let user = response.user;
        this.userRef(user.uid).set(
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
          },
          { merge: true }
        );
      });

  logout = (): Promise<void | boolean> => this.afAuth.auth.signOut();

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private functions: Funcs
  ) {
    this.init();
    setTimeout(
      () =>
        this.afs
          .collection("ping")
          .valueChanges()
          .subscribe(() => console.log("hi fellow hackers")),
      3000
    );
  }
}
