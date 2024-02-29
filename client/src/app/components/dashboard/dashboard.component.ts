import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {NavbarComponent} from "../navbar/navbar.component";
import {RecordItemComponent} from "../record-item/record-item.component";
import {RecordModule} from "../record-item/record.module";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NavbarComponent,
    RecordItemComponent,
    RecordModule,
  ],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  records$!: RecordModel[];

  constructor(
    private recordService: RecordService
  ) {

  }
  ngOnInit(): void {
    this.recordService.getRecords().subscribe(res => {
      this.records$ = res;
    })
  }
}


