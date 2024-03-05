import {RecordModel} from "./record.model";
import {monthExpenseSummary} from "./monthExpenseSummary";
import {UserModel} from "./user-model";

export interface ApiResponseModel{
  user:UserModel,
  records: RecordModel[],
  linearChartData: monthExpenseSummary[],
  pieChartData: pieChartData[]
}
export interface ApiResponseUser{
  status:boolean,
  token:string,
  user:UserModel
}

export interface pieChartData{
  category: string,
  totalSpent: number
}

