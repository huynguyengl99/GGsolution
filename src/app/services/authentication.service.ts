import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  async SignUp(email: string, password: string) {
    try {
      await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return true;
    } catch (error) {
      console.log("Something is wrong:", error.message);
      window.alert(error.message);
      return false;
    }
  }

  /* Sign in */
  async SignIn(email: string, password: string) {
    try {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      return true;
    } catch (error) {
      console.log("Something is wrong:", error.message);
      window.alert(error.message);

      return false;
    }
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.auth.signOut();
    console.log("get there");
  }
}
