import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../../services/record/record.service";
import {CategoryModel} from "../../../models/category";

@Component({
  selector: 'app-new-record',
  standalone: true,
  imports: [],
  templateUrl: './new-record.component.html',
  styleUrl: './new-record.component.scss'
})
export class NewRecordComponent implements OnInit{

categories!: CategoryModel[]
  constructor(
    private recordService: RecordService
  ) {
  }

  ngOnInit(): void {
  this.recordService.getRecordCategories().subscribe(res => this.categories = res)
  }



}
