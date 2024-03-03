import {RecordModel} from "./record.model";
import {monthExpenseSummary} from "./monthExpenseSummary";
import {UserModel} from "./user";

export interface ApiResponseModel{
  user:UserModel,
  records: RecordModel[],
  linearChartData: monthExpenseSummary[],
  pieChartData: pieChartData[]
}
export interface ApiResponseUser{
  status:boolean,
  token:string
}

export interface pieChartData{
  category: string,
  totalSpent: number
}

