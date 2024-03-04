import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {RecordItemDetailedComponent} from "../record/record-item-detailed/record-item-detailed.component";
import {MatPaginator} from "@angular/material/paginator";
import {RecordItemComponent} from "../record/record-item/record-item.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    RecordItemDetailedComponent,
    MatPaginator,
    RecordItemComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit{
  records$!: RecordModel[];
  subscriptions$!:RecordModel[];
  constructor(
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    this.recordService.getRecords().subscribe(res=>{
      this.records$ = res.records.filter(record=> record.category !== 'subscription');
      this.subscriptions$ = res.records.filter(record=> record.category === 'subscription');
    })
  }



}
