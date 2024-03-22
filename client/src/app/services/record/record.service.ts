import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecordModel} from "../../models/record.model";
import {ApiResponseModel} from "../../models/api-response.model";
import {CategoryModel} from "../../models/category";
import {environment} from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private _user_id!:string;
  get user_id(): string {
    return this._user_id;
  }
  set user_id(value: string) {
    this._user_id = value;
  }

  constructor(
    private http: HttpClient
  ) {
    this.user_id = sessionStorage.getItem('_id') ?? '';
  }

  getRecords(): Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(environment.apiUrl+'records/'+this.user_id)
  }

  getRecordCategories(): Observable<CategoryModel>{
    return this.http.get<CategoryModel>(environment.apiUrl+'/categories')
  }

  createRecord(record:RecordModel){}
  updateRecord(record: RecordModel){
  }

  deleteRecord(record: RecordModel){}
}
