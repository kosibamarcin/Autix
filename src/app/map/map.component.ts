import {Component, Inject, ViewEncapsulation} from '@angular/core';
import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Marker, MapsTooltip, DataLabel);
import africa from './africa.json';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  // custom code start
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    // @ts-ignore
    args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
      theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
  }
  // custom code end
  public zoomSettings: object = {
    zoomFactor: 12,
    enable: false
  }
  public titleSettings: object = {
    text: 'Car sharing region',
    textStyle: {
      size: '16px'
    }
  };
  public centerPosition:object = {
    latitude: 50.049683,
    longitude: 19.944544
  };

  public layers: object[] = [
    {
      layerType: 'OSM',
      animationDuration: 0,
      markerSettings: [
        {
          visible: true,
          template: '<div><img src="https://cdn-icons-png.flaticon.com/512/75/75800.png" style="height:30px;width:20px;"></img></div>',
          dataSource: [{
            name: 'Krakow, Malopolska, Polska',
            latitude: 50.049683,
            longitude: 19.944544
          }],
          tooltipSettings: {
            visible: true,
            valuePath: 'name'
          }
        }
      ]
    },
    {
      type: 'SubLayer',
      animationDuration: 0,
      shapeData: africa,
      shapeSettings: {
        fill: '#5100a3',
        opacity: 0.4
      }
    }
  ];
  constructor() {
  };
}
