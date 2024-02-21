import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecordModel} from "../models/record.model";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(
    private http: HttpClient
  ) { }

  getRecords(): Observable<RecordModel[]>{
    return this.http.get<RecordModel[]>('http://localhost:8000/api/records')
  }
  getUserRecords(){}

  createRecord(record:RecordModel){}
  updateRecord(record: RecordModel){
  }

  deleteRecord(record: RecordModel){}
}
