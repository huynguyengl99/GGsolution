import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../models/User";
import { AuthenticationService } from "../services/authentication.service";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  Roles: any = ["Admin", "Author", "Reader"];
  genderList = ["Male", "Female", "Other"];
  booleanList = ["YES", "NO"];
  registerForm = new FormGroup({
    age: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
    gender: new FormControl("Male"),
    name: new FormControl(""),
    religious: new FormControl(false),
    spiritual: new FormControl(false),
    therapy: new FormControl(false, Validators.required),
    bookmark: new FormControl([])
  });
  constructor(
    private authService: AuthenticationService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {}

  async register() {
    console.log(this.registerForm.value);
    let newUser: User = this.registerForm.value;
    console.log(newUser);
    let isSuccess = await this.authService.SignUp(
      newUser.email,
      newUser.password
    );
    if (isSuccess) {
      try {
        await this.afs.collection("Users").add(newUser);
        window.alert("Register successfully");
        this.router.navigate(["login"]);
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
