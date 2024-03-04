import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {RecordModel} from "../../../models/record.model";

@Component({
  selector: 'app-record-item-detailed',
  standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        TitleCasePipe
    ],
  templateUrl: './record-item-detailed.component.html',
  styleUrl: './record-item-detailed.component.scss'
})
export class RecordItemDetailedComponent {

  @Input() record!: RecordModel;
  @Input() dateFormat: string = 'short';
}
