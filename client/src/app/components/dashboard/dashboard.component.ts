import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../services/record.service";
import {RecordModel} from "../../models/record.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
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
