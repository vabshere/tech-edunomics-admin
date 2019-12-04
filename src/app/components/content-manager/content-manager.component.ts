import { Component, OnInit } from "@angular/core";
// import {JsontocsvService} from '../../../utility/services/jsontocsv.service';
// import {Funcs} from '../../../utility/functions';
// import {Content} from '../../../ares-users/models/content';
// import {environment} from '@environments/environment';
// import {LoggedUserService} from '../../../ares-users/services';
// import {LocalUser} from '../../../ares-users/models';
import { map } from "rxjs/internal/operators";
import { MatTableDataSource } from "@angular/material";
import { AngularFirestore } from "@angular/fire/firestore";
import { Funcs } from "src/app/services/funcs.service";

@Component({
  selector: "app-content-manager",
  templateUrl: "./content-manager.component.html",
  styleUrls: ["./content-manager.component.css"]
})
export class ContentManagerComponent implements OnInit {
  contents = [];
  dataSource;
  private colName = "_contents_";

  constructor(
    private afs: AngularFirestore,
    private functions: Funcs // private j2c: JsontocsvService, // public serv: LoggedUserService
  ) {}

  ngOnInit() {
    // this.serv.currentUser
    //   .pipe(
    //     map((user: LocalUser) =>
    this.afs
      .collection(this.colName)
      .valueChanges()
      .subscribe(val => {
        this.contents = val;
        this.dataSource = new MatTableDataSource(
          Object.keys(val).map(k => val[k])
        );
        console.log(this.dataSource);
      });
    //   )
    // )
    // .subscribe();
  }

  // Add Content to firebase
  public addContent(newContent: string) {
    if (newContent === "") {
      this.functions.assertion("Empty field! Please enter a valid name");
      return;
    }
    this.afs
      .doc(`${this.colName}/${newContent}`)
      .set({ data: [{ sample: "sample" }], name: newContent })
      .then(() => this.functions.assertion("New Content Added"))
      .catch((error: any) => this.functions.handleError(error));
  }

  // Delete Content from firebase
  public deleteContent(content) {
    this.functions
      .confirmDialog("Remove Content?", "Are you sure you want to delete?")
      .subscribe((answer: boolean) => {
        if (answer) {
          this.afs
            .doc(`${this.colName}/${content}`)
            .delete()
            .then(() => {
              this.functions.assertion("Content deleted");
            })
            .catch((error: any) => this.functions.handleError(error));
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
