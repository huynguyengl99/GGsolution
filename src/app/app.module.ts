import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { AuthenticationService } from "./services/authentication.service";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatSortModule } from "@angular/material";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActivityViewComponent } from './activity-view/activity-view.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivityListComponent,
    ActivityViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    MatSortModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
