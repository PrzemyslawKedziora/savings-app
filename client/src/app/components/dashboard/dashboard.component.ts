import {Component, OnInit, ViewChild} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {NavbarComponent} from "../navbar/navbar.component";
import {RecordItemComponent} from "../record-item/record-item.component";
import {RecordModule} from "../record-item/record.module";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
import {AreaChartOptions, PieChartOptions} from "../../models/chart-options.model";
import {monthExpenseSummary} from "../../models/monthExpenseSummary";
import {RouterLink} from "@angular/router";
import {pieChartData} from "../../models/api-response.model";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NavbarComponent,
    RecordItemComponent,
    RecordModule,
    NgApexchartsModule,
    RouterLink,
  ],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @ViewChild("areaChart") areaChart!: ChartComponent;
  @ViewChild("pieChart") pieChart!: ChartComponent;
  records$!: RecordModel[];
  public areaExpensesSumChartOptions: AreaChartOptions = {
    series: [
      {
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "area",
      foreColor: '#fafafa',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false,
      style:{
        colors: ['#F44336']
      },
    },
    stroke: {
      curve: "smooth",
      colors: ['green']
    },
    title: {
      text: "Spending summary"
    },
    xaxis: {

    },
    fill:{
      colors:['green'],
      type: 'gradient'
    }
  };
  public donutExpensesCategoryChartOptions: PieChartOptions = {
    series: [],
    chart: {
      type: 'donut'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    labels: [],
    title: {
      text: "Expenditure",
      style: {
        color: 'white'
      }
    }
  }

  constructor(
    private recordService: RecordService
  ) {
  }
  ngOnInit(): void {
    this.recordService.getRecords().subscribe(res => {
      const areachartData = {
        series: [
          {
            name: 'Sum of expenses',
            data: res.linearChartData.map((item: monthExpenseSummary) => item.total_sum)
          }
        ],
        xaxis: {

          categories: res.linearChartData.map((item: monthExpenseSummary) => item.month)
        }
      };

      const piechartData = {
        series : res.pieChartData.map((item: pieChartData) => item.totalSpent),
        labels:  res.pieChartData.map((item: pieChartData)=> item.category.toUpperCase())

      };
      this.areaExpensesSumChartOptions.series = areachartData.series;
      this.areaExpensesSumChartOptions.xaxis = areachartData.xaxis;
      this.donutExpensesCategoryChartOptions.series = piechartData.series;
      this.donutExpensesCategoryChartOptions.labels = piechartData.labels;
      this.records$ = res.records;

    })
  }
}


