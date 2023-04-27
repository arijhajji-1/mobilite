import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title!: string;

  @Input()
  public subtitle!: string;

  @Input()
  public chartClass!: string;

  @Input()
  public chartType!: ChartType;

  @Input()
  public chartData: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive!: any[];

  @Input()
  public footerIconClass!: string;

  @Input()
  public footerText!: string;

  @Input()
  public legendItems!: LegendItem[];

  @Input()
  public withHr!: boolean;

  public chartId!: string;

  constructor() {
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }


}
