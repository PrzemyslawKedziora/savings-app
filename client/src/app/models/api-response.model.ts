import {RecordModel} from "./record.model";
import {MonthExpenseSummary} from "./MonthExpenseSummary";

export interface ApiResponseModel{
  records: RecordModel[],
  linearChartData: MonthExpenseSummary[]
}
export interface ApiResponseUser{
  status:boolean,
  token:string
}
