import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill, ApexNonAxisChartSeries, ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

export type AreaChartOptions = {
  series: ApexAxisChartSeries,
  dataLabels: ApexDataLabels,
  chart: ApexChart,
  xaxis: ApexXAxis,
  stroke: ApexStroke,
  title: ApexTitleSubtitle,
  fill: ApexFill,
}
export type PieChartOptions = {
  series: ApexNonAxisChartSeries,
  chart: ApexChart,
  responsive: ApexResponsive[],
  labels: any,
  title: ApexTitleSubtitle
}
