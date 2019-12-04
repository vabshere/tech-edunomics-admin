import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggedUserService } from "../services/logged-user.service";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private localUserService: LoggedUserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.localUserService.$logged.pipe(
      map(result => {
        if (result) {
          this.router.navigate(["manage"]);
        }
        return !result;
      })
    );
  }
}
