import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { RestService, Hero, StatsByEventType, ChartData, StatsDashboardResponse} from '../service/rest-service.service';
// import { ChartistTooltip } from "chartist-plugin-tooltips-updated";
import 'chartist-plugin-tooltips';
import 'chartist-plugin-pointlabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   public hero: any;
   public heroes: any;
   public data: any[] = [];
   public pieData: any[] = [];
   public pieLabels: any[] = [];
   public visible: boolean = false;

    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];
    public emailChartOptions: any;
    public emailChartResponsive: any[];
    public chartDataByEventType: any[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];

  constructor( public rest: RestService) {}

  ngOnInit() {
      this.getStats();
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6]
      };
      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
//         high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          },
        plugins: [
          Chartist.plugins.tooltip({
                currency: 'Battle Count:',
                class: 'class1 class2',
//                             appendToBody: true,
                pointClass: 'my-cool-point'
              })
//                 Chartist.plugins.ctPointLabels()
         ]
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'THC from battles', imageClass: 'fa fa-circle text-info' }
//         ,
//         { title: 'Click', imageClass: 'fa fa-circle text-danger' },
//         { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];
        this.getDataChart();
        console.log(this.activityChartData);
       this.activityChartType = ChartType.Bar;
        this.activityChartOptions = {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: '245px'
        };
        this.activityChartResponsive = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        this.activityChartLegendItems = [
          { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
          { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
        ];


    }

  getStats(): void {
        this.rest.getAllStats().subscribe((heroes: Hero[]) => {
         this.heroes = heroes;
         console.log(heroes);
        });
      }

  getDataChart(): void {
      this.rest.getDataChart().subscribe((response: StatsDashboardResponse) => {
      this.data = response.chartDataList;

      // lina chart
      this.hoursChartData = {
                    labels: this.data[0].labels,
                    series: [this.data[0].data]
//               labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
//               series: [
//                 [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
//                 [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
//                 [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
//               ]
            };
      //

      this.chartDataByEventType = response.chartDataByEventType;
      this.emailChartType = ChartType.Bar;
      this.emailChartData = {
                labels: response.chartDataByEventType[0].labels,
                series: [response.chartDataByEventType[0].data, response.chartDataByEventType[1].data]
              };
      this.emailChartOptions = {
                     seriesBarDistance: 10,
                     horizontalBars: true,
                     axisX: {
                       showGrid: false
                     },
                     height: '245px',
                     plugins: [
                            Chartist.plugins.tooltip({
                                  currency: 'Battle Count:',
                                  class: 'class1 class2',
      //                             appendToBody: true,
                                  pointClass: 'my-cool-point'
                                })
      //                 Chartist.plugins.ctPointLabels()
                           ]
                   };
       this.emailChartResponsive = [
         ['screen and (max-width: 640px)', {
           seriesBarDistance: 5,
           axisX: {
             labelInterpolationFnc: function (value) {
               return value[0];
             }
           }
         }]
       ];

      this.emailChartLegendItems = [
        { title: 'Battles Played', imageClass: 'fa fa-circle text-info' },
        { title: 'Battles Won', imageClass: 'fa fa-circle text-danger' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
              labels: this.data[1].labels,
              series: [this.data[2].data, this.data[1].data]
            };
     console.log(this.activityChartData);

     this.activityChartOptions = {
               seriesBarDistance: 10,
//                horizontalBars: true,
               axisX: {
                 showGrid: false
               },
               height: '245px',
               plugins: [
                      Chartist.plugins.tooltip({
                            currency: 'Battle Count:',
                            class: 'class1 class2',
//                             appendToBody: true,
                            pointClass: 'my-cool-point'
                          })
//                 Chartist.plugins.ctPointLabels()
                     ]
             };
     this.activityChartResponsive = [
       ['screen and (max-width: 640px)', {
         seriesBarDistance: 5,
         axisX: {
           labelInterpolationFnc: function (value) {
             return value[0];
           }
         }
       }]
     ];
     this.activityChartLegendItems = [
       { title: 'Battles Played', imageClass: 'fa fa-circle text-info' },
       { title: 'Battles Won', imageClass: 'fa fa-circle text-danger' }
     ];
              console.log('test');
              this.visible=true;
      });
    }

     onTableDataChange(event: any) {
        this.page = event;
//         this.getStats();
      }
      onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
//         this.getStats();
      }

      goToLink(heroId: string){
          window.open("https://marketplace.thetanarena.com/item/"+heroId, "_blank");
      }
}
