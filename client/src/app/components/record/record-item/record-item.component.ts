import {Component, Input} from '@angular/core';
import {RecordModel} from "../../../models/record.model";
import {CurrencyPipe, DatePipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-record-item',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    CurrencyPipe
  ],
  templateUrl: './record-item.component.html',
  styleUrl: './record-item.component.scss'
})
export class RecordItemComponent {

  @Input() record!: RecordModel;
  @Input() dateFormat: string = 'short';
}
