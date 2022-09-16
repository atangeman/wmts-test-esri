import { AfterViewInit, Component } from '@angular/core';
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
  SERVER_URL: string = environment.wmts_server;
  map: any;
  baseLayer: any;
  boundaryLayer: any;

  public ngAfterViewInit(): void {
    this.loadMap("public-site-ws-62fd26ed698b8a120dd698cb");
  }

  private loadMap(baseLayerId: string): void {
   
    this.baseLayer = new WMTSLayer({
      url: this.SERVER_URL,
      activeLayer: {
        id: baseLayerId
      },
      version: "1.1.0"
    });

    this.boundaryLayer = new WMTSLayer({
      url: this.SERVER_URL,
      activeLayer: {
        id: baseLayerId + ":boundary"
      },
      version: "1.1.0"
    });

    const osmLayer = new OpenStreetMapLayer();

    var map = new Map({
      layers: [osmLayer, this.baseLayer, this.boundaryLayer],
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-79.9959, 40.4406],
      zoom: 5
    });

    this.baseLayer.when(function(this: any){
      view.extent = this.baseLayer.fullExtent;
    });
  }
}
