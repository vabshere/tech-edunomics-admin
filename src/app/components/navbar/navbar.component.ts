import { Component, OnInit } from "@angular/core";
import { LoggedUserService } from "../../services/logged-user.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Funcs } from "../../services/funcs.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public localUserService: LoggedUserService,
    private router: Router,
    private functions: Funcs
  ) {}

  ngOnInit() {}

  logOut() {
    let c = this.localUserService
      .logout()
      .then(() => this.router.navigate(["log-in"]))
      .catch(err => this.functions.handleError(err.message));
  }
}
