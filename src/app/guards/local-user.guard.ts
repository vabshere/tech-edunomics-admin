import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoggedUserService } from "../services/logged-user.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class LocalUserGuard implements CanActivate {
  constructor(
    private localUserService: LoggedUserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.localUserService.isAuthenticated$.pipe(
      map(result => {
        if (!result) {
          this.router.navigate(["log-in"]);
        }
        return !!result;
      })
    );
  }
}
