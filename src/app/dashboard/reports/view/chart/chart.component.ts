import { Component, Input } from '@angular/core';
import { Chart, ChartType, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() chartType: any = 'line';
  @Input() chartData: any; // You can pass chart data as an input
  @Input() chartOptions: any; // You can pass chart options as an input
  chart: Chart | undefined;

  validChartTypes = ['line', 'bar', 'doughnut', 'radar'];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.validChartTypes.includes(this.chartType)) {
      this.chart = new Chart("canvas", {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
      });
    }
  }

  onChartTypeChange(event: any) {
    const selectedType = event.target.value;
    if (this.validChartTypes[selectedType]) {
      this.chartType = selectedType;
      this.createChart();
    }
  }
}
