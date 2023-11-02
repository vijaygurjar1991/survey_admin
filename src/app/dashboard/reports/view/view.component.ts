import { Component } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  chartType: string = 'line';
  validChartTypes: { [key: string]: ChartType } = {
    line: 'line',
    bar: 'bar',
    doughnut: 'doughnut',
    radar: 'radar',
  };

  charts: Chart[] = [];

  ngOnInit(): void {
    this.createChart('canvas1');
    this.createChart('canvas2');
  }

  createChart(canvasId: string) {
    const existingChart = this.getChartByCanvasId(canvasId);
    if (existingChart) {
      existingChart.destroy();
    }

    if (this.validChartTypes[this.chartType]) {
      const chartData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [5, 10, 15, 10, 20, 18, 25, 35, 28, 22, 25, 55],
          },
          {
            label: 'Dataset 2',
            data: [5, 10, 15, 10, 20, 18, 25, 35, 28, 22, 25, 55],
          }
        ]
      };

      const chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      };

      const newChart = new Chart(canvasId, {
        type: this.validChartTypes[this.chartType],
        data: chartData,
        options: chartOptions
      });

      this.charts.push(newChart);
    }
  }

  onChartTypeChange(event: any, canvasId: string) {
    const selectedType = event.target.value;
    if (this.validChartTypes[selectedType]) {
      this.chartType = selectedType;
      this.createChart(canvasId);
    }
  }

  private getChartByCanvasId(canvasId: string): Chart | undefined {
    return this.charts.find(chart => chart.ctx.canvas.id === canvasId);
  }

}
