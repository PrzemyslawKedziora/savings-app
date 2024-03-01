import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecordModel} from "../../models/record.model";
import {ApiResponseModel} from "../../models/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(
    private http: HttpClient
  ) { }

  getRecords(): Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>('http://localhost:8000/api/records')
  }
  getUserRecords(){}

  createRecord(record:RecordModel){}
  updateRecord(record: RecordModel){
  }

  deleteRecord(record: RecordModel){}
}
