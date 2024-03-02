import {Component, OnInit, ViewChild} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {NavbarComponent} from "../navbar/navbar.component";
import {RecordItemComponent} from "../record-item/record-item.component";
import {RecordModule} from "../record-item/record.module";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
import {AreaChartOptions, PieChartOptions} from "../../models/chart-options.model";
import {MonthExpenseSummary} from "../../models/MonthExpenseSummary";
import {RouterLink} from "@angular/router";


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
        colors: ['#F44336', '#E91E63', '#9C27B0']
      },
    },
    stroke: {
      curve: "smooth",
      colors: ['green']
    },
    title: {
      text: "Spending summary",
      align: "left"
    },
    xaxis: {

    },
    fill:{
      colors:['green'],
      type: 'gradient'
    }
  };
  public donutExpensesCategoryChartOptions: PieChartOptions = {
    series: [44, 55, 13, 43, 22],
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
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  }

  constructor(
    private recordService: RecordService
  ) {
  }
  ngOnInit(): void {
    this.recordService.getRecords().subscribe(res => {
      const chartData = {
        series: [
          {
            name: 'Sum of expenses',
            data: res.linearChartData.map((item: MonthExpenseSummary) => item.total_sum)
          }
        ],
        xaxis: {
          categories: res.linearChartData.map((item: MonthExpenseSummary) => item.month)
        }
      };
      this.areaExpensesSumChartOptions.series = chartData.series;
      this.areaExpensesSumChartOptions.xaxis = chartData.xaxis;
      this.records$ = res.records;

    })
  }
}


