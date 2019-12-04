import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContentManagerComponent } from "./components/content-manager/content-manager.component";
import { ContentDataManagerComponent } from "./components/content-data-manager/content-data-manager.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ConfirmDialogComponent } from "./services/confirm-dialog/confirm-dialog.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";
import { Funcs } from "./services/funcs.service";
import { LogInComponent } from "./components/log-in/log-in.component";
import { LoggedUserService } from "./services/logged-user.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LocalUserGuard } from "./guards/local-user.guard";
import { LoggedInGuard } from "./guards/logged-in.guard";
@NgModule({
  declarations: [
    AppComponent,
    ContentManagerComponent,
    ContentDataManagerComponent,
    ConfirmDialogComponent,
    LogInComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [Funcs, LoggedUserService, LocalUserGuard, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
