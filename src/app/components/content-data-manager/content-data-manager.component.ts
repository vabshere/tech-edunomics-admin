import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
// import {Funcs} from '@utils';
import { finalize } from "rxjs/operators";
import { Funcs } from "src/app/services/funcs.service";

@Component({
  selector: "app-content-data-manager",
  templateUrl: "./content-data-manager.component.html",
  styleUrls: ["./content-data-manager.component.css"]
})
export class ContentDataManagerComponent implements OnInit {
  contentData: object[];
  fullContentData: object[];
  keys: string[] = [];
  types = {};
  tempFiles: string[] = [];
  newFiles: string[] = [];
  name: string;
  newColumn = {
    name: "",
    type: "text"
  };
  changed = false;

  readonly initValue = {
    text: "",
    bool: true
  };
  public updateData = () =>
    this.afs
      .doc(`${this.colName}/${this.name}`)
      .set({ name: this.name, data: this.contentData }, { merge: true })
      .then(() => {
        this.changed = false;
      })
      .catch(err => {
        this.functions.handleError(err.message);
      });
  private colName = "_contents_";

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private functions: Funcs,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params["name"];
    this.afs
      .doc(`${this.colName}/${this.name}`)
      .valueChanges()
      .subscribe(content => {
        this.fullContentData = content["data"];
        this.initData(content["data"]);
      });
  }

  public saveData() {
    this.updateData().then(() => this.router.navigateByUrl("/manage"));
  }

  public insertRow(i: number) {
    const data: object = {};
    this.keys.forEach(key => {
      data[key] = this.initValue[this.types[key]];
    });
    this.contentData.splice(i + 1, 0, data);
    this.changed = true;
  }

  public deleteRow(i: number) {
    this.functions
      .confirmDialog("Delete Row?", "Are you sure you want to delete?")
      .subscribe((flag: boolean) => {
        if (flag) {
          if (this.contentData.length === 1) {
            this.functions.assertion(
              "Cannot empty completely! Go back and delete the content name instead"
            );
            return;
          }
          for (const key of this.keys) {
            if (this.types[key] == "file") {
              this.tempFiles.push(this.contentData[i][key]["filename"]);
            }
          }
          this.contentData.splice(i, 1);
          this.changed = true;
        }
      });
  }

  public moveUp(i: number) {
    if (i === 0) {
      this.functions.assertion("Already at top");
    } else {
      const temp = this.contentData[i];
      this.contentData[i] = this.contentData[i - 1];
      this.contentData[i - 1] = temp;
      this.changed = true;
    }
  }

  public moveDown(i: number) {
    if (i === this.contentData.length - 1) {
      this.functions.assertion("Already at bottom");
    } else {
      const temp = this.contentData[i];
      this.contentData[i] = this.contentData[i + 1];
      this.contentData[i + 1] = temp;
      this.changed = true;
    }
  }

  public addColumn() {
    if (this.newColumn.name.trim() === "") {
      this.functions.assertion(
        "Invalid column name, please enter a valid column name"
      );
      return;
    }
    if (this.keys.indexOf(this.newColumn.name) !== -1) {
      this.functions.assertion("Column nme already exists!");
      return;
    }
    this.keys.push(this.newColumn.name);
    this.contentData.forEach(data => {
      data[this.newColumn.name] = JSON.parse(
        JSON.stringify(this.initValue[this.newColumn.type])
      );
    });
    this.types[this.newColumn.name] = this.newColumn.type;
    this.newColumn = {
      name: "",
      type: "text"
    };
    this.changed = true;
  }

  public removeColumn(i: number) {
    this.functions
      .confirmDialog("Remove Column?", "Are you sure you want to remove?")
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          const key = this.keys.splice(i, 1)[0];
          this.contentData.forEach(data => {
            delete data[key];
            if (key == "file") {
              this.tempFiles.push(data[key].filename);
            }
          });
          delete this.types[key];
          if (this.keys.length === 0) {
            this.contentData = [{}];
          }
          this.changed = true;
        }
      });
  }

  private initData(data: object[]) {
    const isoregex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    this.contentData = data;
    if (data.length > 0) {
      this.keys = Object.keys(data[0]);
      for (const key of this.keys) {
        if (typeof data[0][key] === "object" && data[0][key].type === "file") {
          this.types[key] = "file";
        } else if (typeof data[0][key] === "boolean") {
          this.types[key] = "bool";
        } else {
          this.types[key] = "text";
        }
      }
    }
  }
}
