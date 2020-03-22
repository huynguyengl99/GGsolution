import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivityInfo } from "../models/ActivityInfo";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
const list: ActivityInfo[] = [];
@Component({
  selector: "app-activity-list",
  templateUrl: "./activity-list.component.html",
  styleUrls: ["./activity-list.component.scss"]
})
export class ActivityListComponent implements OnInit {
  private activityCollection: AngularFirestoreCollection<ActivityInfo>;
  activityList: Observable<ActivityInfo[]>;
  faPlusCircle = faPlusCircle;
  displayedColumns: string[] = [
    "id",
    "title",
    "type",
    "counselor",
    "time",
    "url"
  ];
  dataSource = new MatTableDataSource(list);
  constructor(private afs: AngularFirestore, private router: Router) {
    this.activityCollection = afs.collection<ActivityInfo>("ActivityInfos");
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (
      item: ActivityInfo,
      property
    ): string | number => {
      switch (property) {
        case "fromDate":
          return new Date(item.time.toDate()).getTime();
        default:
          return item[property];
      }
    };

    this.activityCollection.valueChanges().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  viewActivity(activity) {
    this.router.navigate(["activity", activity.id]);
  }
}
