import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Funcs } from "src/app/services/funcs.service";
import { LoggedUserService } from "src/app/services/logged-user.service";

@Component({
  moduleId: module.id,
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent {
  submitted = false;

  constructor(
    private loginService: LoggedUserService,
    private functions: Funcs,
    private router: Router
  ) {}

  onSubmit = (username: string, password: string): void => {
    this.submitted = true;
    this.loginService
      .signIn(username, password)
      .then(() => {
        console.log("logged in");
        this.router.navigate(["manage"]);
      })
      .catch(err => {
        this.submitted = false;
        this.functions.handleError(err.message);
      });
  };
}
