import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivityInfo } from "../models/ActivityInfo";
import { firestore } from "firebase";
import { ActivatedRoute } from "@angular/router";
import { switchMap, tap, map } from "rxjs/operators";
import { Observable, empty } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
const group = [
  "Family",
  "School",
  "Work",
  "Relationship",
  "Lifestyle",
  "Other"
];

const fake: ActivityInfo = {
  id: "12345",
  counselor: "string",
  feedbackList: { "123": "1bad" },
  ratingList: { bac: 3.5 },
  registerList: ["123"],
  bookmarkedList: ["123"],
  time: firestore.Timestamp.fromDate(new Date()),
  title: "string",
  type: "Relationship",
  url: "string"
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
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((value: any) => value.params.id),
        map(id => {
          console.log(id);
          if (id) {
            this.itemDoc = this.afs.doc<ActivityInfo>(`ActivityInfos/${id}`);
            return this.itemDoc.valueChanges();
          }
          return empty();
        }),
        tap(doc => {
          if (doc.source) {
            doc.subscribe(value => {
              this.activityForm.setValue(value);
            });
          }
        })
      )
      .subscribe();
  }

  submit = () => {
    console.log(this.activityForm.value);
  };
}
