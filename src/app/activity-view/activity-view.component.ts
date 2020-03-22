import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivityInfo } from "../models/ActivityInfo";
import { firestore } from "firebase";
import { ActivatedRoute, Router } from "@angular/router";
import { tap, map, take } from "rxjs/operators";
import { Observable, empty } from "rxjs";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from "../confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material";
const group = [
  "Family",
  "School",
  "Work",
  "Relationship",
  "Lifestyle",
  "Other"
];

const fake: ActivityInfo = {
  id: "",
  counselor: "",
  feedbackList: {},
  ratingList: {},
  registerList: [],
  bookmarkedList: [],
  time: firestore.Timestamp.fromDate(new Date()),
  title: "",
  type: "",
  url: ""
};

@Component({
  selector: "app-activity-view",
  templateUrl: "./activity-view.component.html",
  styleUrls: ["./activity-view.component.scss"]
})
export class ActivityViewComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<ActivityInfo>;
  activity: Observable<ActivityInfo>;
  id: string = "";
  group = group;
  activityForm = new FormGroup({
    counselor: new FormControl(""),
    time: new FormControl(""),
    title: new FormControl(""),
    type: new FormControl(""),
    url: new FormControl(""),
    registerList: new FormControl([]),
    feedbackList: new FormControl({}),
    ratingList: new FormControl({}),
    id: new FormControl(""),
    bookmarkedList: new FormControl([])
  });
  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        take(1),
        map((value: any) => value.params.id),
        map(id => {
          if (id) {
            this.id = id;
            this.itemDoc = this.afs.doc<ActivityInfo>(`ActivityInfos/${id}`);
            return this.itemDoc.valueChanges();
          }
          return empty();
        }),
        tap(doc => {
          if (doc.source) {
            doc.subscribe(value => {
              this.activityForm.setValue({
                ...value,
                time: value ? value.time.toDate() : new Date()
              });
            });
          }
        })
      )
      .subscribe();
  }

  submit = async () => {
    try {
      if (this.id) {
        await this.itemDoc.update(this.getDirtyValues(this.activityForm));
      } else {
        let newActivity: ActivityInfo = this.activityForm.value;
        const ref = await firestore()
          .collection("ActivityInfos")
          .doc();
        newActivity.id = ref.id;
        await ref.set(newActivity);
      }
      this.router.navigate(["activities"]);
    } catch (error) {
      console.error(error);
    }
  };

  getDirtyValues(form: any) {
    let dirtyValues = {};

    Object.keys(form.controls).forEach(key => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  cancel = () => {
    this.router.navigate(["activities"]);
  };

  deleteActivity = () => {
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        try {
          await this.itemDoc.delete();
          this.router.navigate(["activities"]);
        } catch (error) {
          console.error("Error on deleting");
        }
      }
    });
  };
}
