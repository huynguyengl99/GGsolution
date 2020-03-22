import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}
  email = new FormControl("");
  password = new FormControl("");
  ngOnInit() {}

  logIn = async () => {
    let success = await this.authenticationService.SignIn(
      this.email.value,
      this.password.value
    );
    if (success) {
      this.router.navigate(["activities"]);
    }
  };
}
