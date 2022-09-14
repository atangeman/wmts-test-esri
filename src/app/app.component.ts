import { AfterViewInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../environments/environment';


import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  map: any;

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    const layer = new WMTSLayer({
      url: "http://gs-dev.connectanywhere.co:8080/geoserver/gwc/service/wmts",
      activeLayer: {
        id: "public-site-ws-62fd26ed698b8a120dd698cb"
      },
      version: "1.1.0"
    });

    const imageTileLayer = new TileLayer({
      portalItem: {
        id: "10df2279f9684e4a9f6a7f08febac2a9" // World Hillshade
      }
    });
    
    this.map = new Map({
      layers: [imageTileLayer, layer]
    });

    const view = new MapView({
      container: "viewDiv",
      map: this.map,
      center: [-79.9959, 40.4406],
      zoom: 13
    });
    
    layer.when(function(){
      view.extent = layer.fullExtent;
    });
  }
}
