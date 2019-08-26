import {Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatTabChangeEvent} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ImageServiceService} from '../../services/image-service.service';
import {ImageNetModelComponent} from '../image-net-model/image-net-model.component';

// Including amcharts
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';



am4core.useTheme(am4themes_animated);

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements  OnInit {
  private chart: am4charts.XYChart;
  public ImageNotUploaded = true;
  public tab1ImageNotUploaded = true;
  public tab2ImageNotUploaded = true;
  selectedFile: ImageSnippet;

  constructor(private imageService: ImageServiceService, private zone: NgZone, public dialog: MatDialog) {  }
  ngOnInit() {
  }

  createGraph1() {
    const chart = am4core.create('chartdiv1', am4charts.RadarChart);
    chart.scrollbarX = new am4core.Scrollbar();

    const data = [
      {
        country: 'Cat',
        visits: 50,
      },
      {
        country: 'Dog',
        visits: 90,
        href: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg'
      },
      {
        country: 'Gitar',
        visits: 30
      },
      {
        country: 'Bottle',
        visits: 10
      },
      {
        country: 'Tiger',
        visits: 60
      },

    ];
    // for (let i = 0; i < 20; i++) {
    //   data.push({category: i, value: Math.round(Math.random() * 100)});
    // }

    chart.data = data;
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);
//
// Create axes
    // @ts-ignore
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.labels.template.rotation = 0;

    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.grid.template.disabled = true;
// categoryAxis.renderer.labels.template.disabled = true;
    const labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(-60);
    labelTemplate.location = 0.5;
    labelTemplate.relativeRotation = 120;

    // @ts-ignore
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.tooltip.disabled = true;

// Create series
    const series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'country';
    series.columns.template.strokeWidth = 0;
    series.tooltipText = '{valueY}';
    series.columns.template.radarColumn.cornerRadius = 50;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = 'horizontal';

// on hover, make corner radiuses bigger
    const hoverState = series.columns.template.radarColumn.states.create('hover');
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;


    series.columns.template.adapter.add('fill', function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

// Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(50);
    chart.cursor.lineY.disabled = true;

  }
  // Graph1 code ends here

  // Graph2 starts here
  createGraph0() {
    const chart = am4core.create('chartdiv0', am4plugins_forceDirected.ForceDirectedTree);
    const networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

    chart.data = [
      {
        name: 'Dog',
        children: [
          {
            name: 'ImageNet',
            children: [
              { name: 'Cat', value: 60 },
              { name: 'Dog', value: 100 },
              { name: 'Bottle', value: 20 },
              { name: 'Tiger', value: 40 },
              { name: 'Lion', value: 70 }
            ]
          },
          {
            name: 'Caltech101',
            children: [
              { name: 'Cat', value: 60 },
              { name: 'Dog', value: 100 },
              { name: 'Bottle', value: 20 },
              { name: 'Tiger', value: 40 },
              { name: 'Lion', value: 70 }
            ]
          },
          {
            name: 'Caltech256',
            children: [
              { name: 'Cat', value: 60 },
              { name: 'Dog', value: 100 },
              { name: 'Bottle', value: 20 },
              { name: 'Tiger', value: 40 },
              { name: 'Lion', value: 70 }
            ]
          },
          {
            name: 'CIFAR100',
            children: [
              { name: 'Cat', value: 60 },
              { name: 'Dog', value: 100 },
              { name: 'Bottle', value: 20 },
              { name: 'Tiger', value: 40 },
              { name: 'Lion', value: 70 }
            ]
          },
        ]
      }
    ];

    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.children = 'children';
    networkSeries.nodes.template.tooltipText = '{name}:{value}';
    networkSeries.nodes.template.fillOpacity = 1;
    networkSeries.manyBodyStrength = -20;
    networkSeries.links.template.strength = 0.8;
    networkSeries.minRadius = am4core.percent(2);

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 10;
  }
  // Graph2 Ends here


  // Graph3 starts here
  createGraph2() {
    const chart = am4core.create('chartdiv2', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingBottom = 30;

    chart.data = [{
      name: 'Monica',
      steps: 100,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg'
    }, {
      name: 'Joey',
      steps: 85,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg'
    }, {
      name: 'Ross',
      steps: 55,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg'
    }, {
      name: 'Phoebe',
      steps: 25,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg'
    }, {
      name: 'Rachel',
      steps: 10,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg'
    }];

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    const series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = 'steps';
    series.dataFields.categoryX = 'name';
    series.tooltipText = '{valueY.value}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.dy = - 6;
    series.columnsContainer.zIndex = 100;

    const columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({ target: columnTemplate, property: 'fill', dataField: 'valueY', min: am4core.color('#e5dc36'), max: am4core.color('#5faa46') });
    series.mainContainer.mask = undefined;

    const cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = 'none';

    const bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = 'bottom';
    bullet.align = 'center';
    bullet.isMeasured = true;
    // @ts-ignore
    bullet.mouseEnabled = false;
    bullet.verticalCenter = 'bottom';
    bullet.interactionsEnabled = false;

    const hoverState = bullet.states.create('hover');
    const outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add('radius', function(radius, target) {
      const circleBullet = target.parent;
      // @ts-ignore
      return circleBullet.circle.pixelRadius + 10;
    });

    const image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';
    image.propertyFields.href = 'href';

    image.adapter.add('mask', function(mask, target) {
      const circleBullet = target.parent;
      // @ts-ignore
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on('cursorpositionchanged', function(event) {
      const dataItem = series.tooltipDataItem;

      // @ts-ignore
      if (dataItem.column) {
        // @ts-ignore
        const bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet !== bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet !== bullet) {

          const hs = bullet.states.getKey('hover');
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    });

  }
  // Graph3 End here

  createGraph3() {
    const chart = am4core.create('chartdiv3', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 40;

    chart.data = [{
      name: 'Monica',
      steps: 45688,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg'
    }, {
      name: 'Joey',
      steps: 35781,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg'
    }, {
      name: 'Ross',
      steps: 25464,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg'
    }, {
      name: 'Phoebe',
      steps: 18788,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg'
    }, {
      name: 'Rachel',
      steps: 15465,
      href: 'https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg'
    }];

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dx = -40;
    categoryAxis.renderer.minWidth = 120;
    categoryAxis.renderer.tooltip.dx = -40;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;
    valueAxis.renderer.labels.template.dy = 20;

    const series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueX = 'steps';
    series.dataFields.categoryY = 'name';
    series.tooltipText = '{valueX.value}';
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.dy = - 30;
    series.columnsContainer.zIndex = 100;

    const columnTemplate = series.columns.template;
    columnTemplate.height = am4core.percent(50);
    columnTemplate.maxHeight = 50;
    columnTemplate.column.cornerRadius(60, 10, 60, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({ target: columnTemplate, property: 'fill', dataField: 'valueX', min: am4core.color('#e5dc36'), max: am4core.color('#5faa46') });
    series.mainContainer.mask = undefined;

    const cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = 'none';

    const bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = 'middle';
    bullet.align = 'left';
    bullet.isMeasured = true;
    bullet.interactionsEnabled = false;
    bullet.horizontalCenter = 'right';
    bullet.interactionsEnabled = false;

    const hoverState = bullet.states.create('hover');
    const outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add('radius', function(radius, target) {
      const circleBullet = target.parent;
      // @ts-ignore
      return circleBullet.circle.pixelRadius + 10;
    });

    const image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'middle';
    image.propertyFields.href = 'href';

    image.adapter.add('mask', function(mask, target) {
      const circleBullet = target.parent;
      // @ts-ignore
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on('cursorpositionchanged', function(event) {
      const dataItem = series.tooltipDataItem;

      // @ts-ignore
      if (dataItem.column) {
        // @ts-ignore
        const bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet !== bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet !== bullet) {

          const hs = bullet.states.getKey('hover');
          // @ts-ignore
          hs.properties.dx = dataItem.column.pixelWidth;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    });

  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    if (tabChangeEvent.index === 0) {
      this.createGraph0();
    } else if (tabChangeEvent.index === 1) {
      this.createGraph1();
    } else if (tabChangeEvent.index === 2) {
      this.createGraph2();
    } else if (tabChangeEvent.index === 3) {
      this.createGraph3();
    }

  }

  // Start of Processing of Image

  loadFile(event) {
    const image = document.getElementById('output');
    // @ts-ignore
    image.src = URL.createObjectURL(event.target.files[0]);
    this.createGraph0();
  }
  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //
  //   reader.addEventListener('load', (event: any) => {
  //     this.createGraph1();
  //
  //     this.selectedFile = new ImageSnippet(event.target.result, file);
  //     this.ImageNotUploaded = false;
  //     // this.tab1ImageNotUploaded = false;
  //     // this.tab2ImageNotUploaded = false;
  //
  //     // debugger;
  //     this.imageService.uploadImage(this.selectedFile.file).subscribe(
  //       (res) => {
  //
  //       },
  //       (err) => {
  //
  //       });
  //   });
  //
  //   reader.readAsDataURL(file);
  //
  // }

// Code for Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(ImageNetModelComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
