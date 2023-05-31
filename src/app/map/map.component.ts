import {Component, OnInit} from '@angular/core';
import { Map, Marker, icon, Icon, tileLayer, polygon} from 'leaflet';
import { CarsService } from "../../services/cars.service";
import { ZonesService } from "../../services/zones.service";
import { RentService } from "../../services/rent.service";
import {HttpErrorResponse} from "@angular/common/http";

var myIconReplc = Icon.extend({
  options: {
    iconUrl: "https://cdn-icons-png.flaticon.com/512/75/75800.png",
    iconSize: [30,20],
    iconAnchor: [8, 30] // horizontal puis vertical
  }
});


class Car {
  id!: number
  name!: string
  coordinates: any
}

class Zone {
  id!: number;
  polygon: any;
  color: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit{
  map!: Map;
  cars!: Car[];
  zones!: Zone[];

  ngOnInit() {
    this.getCars();
  }

  public getCars() {
    this.carsService.get_cars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        this.getZones();
        this.initializeMap()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getZones() {
    this.zonesService.get_zones().subscribe(
      (response: Zone[]) => {
        this.zones = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  initializeMap() {
    this.map = new Map('map').setView([50.049683, 19.944544], 12);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    for (let i = 0; i < this.zones.length; i++){
      polygon(this.zones[i].polygon, {
        color: this.zones[i].color,
        fillColor: this.zones[i].color,
        fillOpacity: 0.5,
      }).addTo(this.map);
    }

    for (let i = 0; i < this.cars.length ; i++) {
      const marker = new Marker(this.cars[i].coordinates).addTo(this.map);
      marker.bindPopup(this.cars[i].name + ' <br> <a class="nav-link" href="rent">Wynajmij</a>');
      marker.setIcon(new myIconReplc)
    }
  }
    constructor(private zonesService : ZonesService, private carsService: CarsService, private rentService: RentService) {
  };
}





// polygon([[50.05927, 19.925431], [50.059202, 19.925472], [50.058186, 19.926134], [50.05769, 19.926493], [50.056782, 19.926937], [50.056167, 19.927278], [50.055543, 19.927528], [50.055347, 19.927605], [50.055184, 19.927679], [50.054918, 19.927765], [50.054124, 19.928393], [50.054366, 19.929204], [50.054538, 19.929992], [50.054552, 19.930656], [50.054375, 19.931294], [50.054003, 19.931708], [50.052157, 19.932738], [50.051494, 19.933163], [50.049981, 19.934134], [50.047646, 19.935951], [50.045949, 19.937644], [50.045294, 19.938854], [50.044939, 19.940127], [50.0448, 19.941651], [50.044809, 19.942283], [50.044862, 19.942985], [50.045172, 19.944432], [50.045872, 19.946219], [50.046923, 19.948801], [50.049695, 19.954005], [50.050141, 19.954846], [50.050839, 19.953901], [50.05059, 19.953441], [50.05095, 19.95325], [50.051158, 19.953196], [50.051808, 19.952282], [50.053073, 19.950562], [50.053812, 19.949734], [50.053929, 19.949586], [50.053897, 19.949339], [50.054056, 19.948923], [50.054407, 19.949234], [50.05544, 19.948497], [50.05551, 19.947872], [50.055809, 19.947948], [50.055948, 19.948041], [50.056719, 19.947755], [50.056943, 19.9477], [50.057249, 19.947584], [50.057509, 19.947512], [50.057589, 19.94751], [50.057947, 19.947485], [50.057988, 19.947346], [50.058319, 19.947308], [50.058772, 19.947513], [50.058811, 19.947601], [50.059792, 19.947551], [50.060147, 19.94754], [50.060762, 19.947583], [50.061378, 19.947628], [50.062104, 19.947558], [50.062752, 19.9475], [50.064492, 19.947418], [50.064832, 19.947395], [50.064984, 19.949147], [50.065401, 19.949126], [50.06637, 19.949567], [50.066942, 19.949796], [50.067277, 19.949898], [50.068248, 19.949815], [50.067841, 19.952116], [50.068863, 19.952888], [50.072009, 19.955176], [50.073405, 19.956242], [50.073369, 19.956362], [50.074482, 19.957192], [50.074499, 19.957142], [50.075164, 19.957632], [50.075238, 19.957687], [50.075291, 19.957716], [50.075701, 19.957939], [50.075894, 19.958145], [50.075981, 19.95822], [50.076987, 19.958951], [50.077874, 19.959603], [50.078515, 19.960082], [50.078795, 19.960292], [50.078948, 19.960266], [50.079309, 19.960285], [50.079534, 19.959634], [50.079642, 19.959285], [50.079733, 19.958485], [50.07976, 19.957915], [50.079835, 19.957233], [50.079735, 19.957181], [50.079872, 19.956528], [50.079992, 19.955532], [50.080133, 19.954695], [50.080264, 19.95369], [50.08059, 19.951266], [50.080668, 19.950909], [50.080794, 19.950485], [50.080695, 19.950392], [50.080639, 19.950626], [50.080554, 19.950578], [50.080587, 19.950304], [50.080685, 19.949648], [50.080967, 19.947329], [50.080578, 19.947106], [50.080372, 19.946963], [50.079869, 19.946613], [50.078818, 19.945901], [50.078502, 19.94574], [50.077765, 19.94548], [50.077507, 19.945414], [50.077389, 19.945029], [50.076982, 19.944914], [50.0771, 19.944221], [50.076522, 19.942451], [50.076109, 19.941158], [50.075925, 19.940993], [50.07554, 19.941084], [50.075257, 19.940299], [50.075092, 19.940045], [50.074153, 19.938824], [50.073843, 19.938322], [50.073588, 19.937908], [50.073609, 19.937428], [50.073572, 19.936704], [50.073438, 19.935546], [50.073387, 19.934755], [50.073342, 19.934437], [50.072967, 19.932934], [50.072746, 19.932372], [50.07247, 19.931808], [50.072277, 19.931466], [50.071151, 19.929243], [50.070288, 19.927679], [50.070063, 19.927446], [50.068768, 19.926567], [50.067056, 19.925465], [50.06686, 19.925358], [50.065353, 19.924778], [50.064006, 19.92423], [50.063485, 19.924034], [50.062883, 19.923864], [50.062606, 19.923838], [50.062236, 19.923825], [50.06196, 19.92398], [50.060946, 19.924468], [50.059698, 19.925175], [50.05927, 19.925431]],{
//   color: 'blue',
//   fillColor: 'blue',
//   fillOpacity: 0.5,
// }).addTo(this.map);

// import {Component, Inject, ViewEncapsulation} from '@angular/core';
// import { MapsTheme, MapsTooltip, DataLabel, Maps, Marker, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
// import { MapAjax } from '@syncfusion/ej2-maps';
// Maps.Inject(Marker, MapsTooltip, DataLabel);
// import africa from './africa.json';
// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent {
//   // custom code start
//   public load = (args: ILoadEventArgs) => {
//     let theme: string = location.hash.split('/')[1];
//     theme = theme ? theme : 'Material';
//     // @ts-ignore
//     args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
//       theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
//   }
//   public rentCar(){
//     alert('la');
//   }
//   // custom code end
//   public zoomSettings: object = {
//     zoomFactor: 12,
//     enable: false
//   }
//   public titleSettings: object = {
//     text: 'Car sharing region',
//     textStyle: {
//       size: '16px'
//     }
//   };
//   public centerPosition:object = {
//     latitude: 50.049683,
//     longitude: 19.944544
//   };
//
//   public layers: object[] = [
//     {
//       layerType: 'OSM',
//       animationDuration: 0,
//       markerSettings: [
//         {
//           visible: true,
//           template: '<div><img src="https://cdn-icons-png.flaticon.com/512/75/75800.png" style="height:30px;width:20px;"></img></div>',
//           dataSource: [{
//             name: 'marka: BMW, model: X3, zaięg: 100km',
//             latitude: 50.049683,
//             longitude: 19.944544
//           }],
//           tooltipSettings: {
//             visible: true,
//             valuePath: 'name'
//           },
//         }
//       ]
//     },
//     {
//       type: 'SubLayer',
//       animationDuration: 0,
//       shapeData: africa,
//       shapeSettings: {
//         fill: '#5100a3',
//         opacity: 0.4
//       }
//     }
//   ];
//   constructor() {
//   };
// }
