import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { ActivityViewComponent } from "./activity-view/activity-view.component";

const redirectLoggedInToItems = () => redirectLoggedInTo(["activities"]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  { path: "register", component: RegisterComponent },
  {
    path: "activities",
    component: ActivityListComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "activity",
    component: ActivityViewComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "activity/:id",
    component: ActivityViewComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
