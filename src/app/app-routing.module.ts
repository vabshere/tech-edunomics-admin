import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentManagerComponent } from "./components/content-manager/content-manager.component";
import { ContentDataManagerComponent } from "./components/content-data-manager/content-data-manager.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { LocalUserGuard } from "./guards/local-user.guard";

const routes: Routes = [
  { path: "", redirectTo: "log-in", pathMatch: "prefix" },
  { path: "log-in", component: LogInComponent, canActivate: [LoggedInGuard] },
  {
    path: "manage",
    component: ContentManagerComponent,
    canActivate: [LocalUserGuard],
    canActivateChild: [LocalUserGuard]
  },
  {
    path: "manage/:name",
    component: ContentDataManagerComponent,
    canActivate: [LocalUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
