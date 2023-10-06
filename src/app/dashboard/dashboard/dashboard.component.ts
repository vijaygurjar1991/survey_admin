import { Component } from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chart: any = [];
  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
        labels: ['2023-04-06', '2023-05-06', '2023-06-06', '2023-07-06', '2023-08-06', '2023-09-06', '2023-10-06'],
        datasets: [
          {
            label: "online",
            data: ['300', '350', '280', '550', '450', '700', '680'],
            borderColor: '#00e396',
            backgroundColor: 'rgba(0, 227, 150, 0.2)',
            fill: {
              target: 'origin',
              above: 'rgba(0, 227, 150, 0.2)',
              below: 'rgba(0, 227, 150, 0)'
            },
            tension: 0.3
          },
          {
            label: "offline",
            data: ['100', '300', '520', '300', '320', '400', '350'],
            borderColor: '#008ffb',
            backgroundColor: 'rgba(0, 143, 251, 0.2)',
            fill: {
              target: 'origin',
              above: 'rgba(0, 143, 251, 0.2)',
              below: 'rgba(0, 143, 251, 0)'
            },
            tension: 0.3
          }
        ]
      },
      options: {
        aspectRatio: 3
      }
    });
  }

}
