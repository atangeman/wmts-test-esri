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

  map: any;
  layer: any;

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
   
    this.layer = new WMTSLayer({
      url: "http://gs-dev.connectanywhere.co:8080/geoserver/gwc/service/wmts",
      activeLayer: {
        id: "public-site-ws-62fd26ed698b8a120dd698cb"
      },
      version: "1.1.0"
    });

    const osmLayer = new OpenStreetMapLayer();

    var map = new Map({
      layers: [osmLayer, this.layer],
      //basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-79.9959, 40.4406],
      zoom: 5
    });

    this.layer.when(function(this: any){
      view.extent = this.layer.fullExtent;
    });
  }
}
