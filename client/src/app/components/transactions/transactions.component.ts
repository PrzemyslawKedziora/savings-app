import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {RecordItemDetailedComponent} from "../record/record-item-detailed/record-item-detailed.component";
import {MatPaginator} from "@angular/material/paginator";
import {RecordItemComponent} from "../record/record-item/record-item.component";
import {MatDialog} from "@angular/material/dialog";
import {NewRecordComponent} from "../record/new-record/new-record.component";

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
  private sortDirection: number = 1;
  constructor(
    private recordService: RecordService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recordService.getRecords().subscribe(res=>{
      this.records$ = res.records.filter(record=> record.category !== 'subscription');
      this.subscriptions$ = res.records.filter(record=> record.category === 'subscription');
    })
  }

  sortby(criteria: string,tab:RecordModel[]){
    switch (criteria) {
      case 'name':{
        tab.sort((record1,record2)=>{
          return this.sortDirection * (record1.description.localeCompare(record2.description));
        })
        break;
      }
      case 'date':{
        tab.sort((record1,record2)=>{
          const date1 = new Date(record1.updated_at);
          const date2 = new Date(record2.updated_at);

          return this.sortDirection * (date1.getTime() - date2.getTime());
        })
        break;
      }
      case 'amount':{
        tab.sort((record1,record2)=>{
            return this.sortDirection * (record1.money_spent - record2.money_spent);
        })
        break;
      }
    }
    this.sortDirection *= -1;
  }
  openAddRecordDialog(){
    this.dialog.open(NewRecordComponent);
  }


}
