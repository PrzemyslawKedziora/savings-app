import {Component, OnInit, ViewChild} from '@angular/core';
import {RecordService} from "../../services/record/record.service";
import {RecordModel} from "../../models/record.model";
import {NavbarComponent} from "../navbar/navbar.component";
import {RecordItemComponent} from "../record-item/record-item.component";
import {RecordModule} from "../record-item/record.module";
import {ChartComponent, NgApexchartsModule, ApexAxisChartSeries, ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
 ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill,
};
export interface MonthlyData {
  month: string;
  total_sum: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    NavbarComponent,
    RecordItemComponent,
    RecordModule,
    NgApexchartsModule,
  ],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  @ViewChild("chart")
  chart!: ChartComponent;
  records$!: RecordModel[];
  public chartOptions: ChartOptions = {
    series: [
      {
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line",
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
            data: res.linearChartData.map((item: MonthlyData) => item.total_sum)
          }
        ],
        xaxis: {
          categories: res.linearChartData.map((item: MonthlyData) => item.month)
        }
      };
      this.chartOptions.series = chartData.series;
      this.chartOptions.xaxis = chartData.xaxis;
      this.records$ = res.records;

    })
  }
}


