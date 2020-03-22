import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "AdminShareapy";
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logOut = () => {
    this.authenticationService.SignOut();
    this.router.navigate(["login"]);
  };
}
