import { AfterViewInit, Component, Input } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../environments/environment';


import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
import OpenStreetMapLayer from "@arcgis/core/layers/OpenStreetMapLayer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @Input() baseLayerId: string = "public-site-ws-61d5053998d0c15769f3a995";
  SERVER_URL: string = environment.wmts_server;
  map: any;
  

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
   
    var baseLayer = new WMTSLayer({
      url: this.SERVER_URL,
      activeLayer: {
        id: this.baseLayerId
      },
      version: "1.1.0"
    });

    var boundaryLayer = new WMTSLayer({
      url: this.SERVER_URL,
      activeLayer: {
        id: this.baseLayerId + ":boundary"
      },
      version: "1.1.0"
    });

    const osmLayer = new OpenStreetMapLayer();

    var map = new Map({
      layers: [osmLayer, baseLayer, boundaryLayer],
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-79.9959, 40.4406],
      zoom: 5
    });

    boundaryLayer.when(function() {
      view.extent = boundaryLayer.fullExtent;
      view.zoom = 10;
    });
  }
}
