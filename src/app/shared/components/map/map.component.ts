import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { ILocationCoordinates, ILocationInfo, IMapStyle } from './i-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() city!: string;
  @Input() country!: string;
  @Input() customStyle: IMapStyle = null;
  
  // @Input() coordinates!: [number, number] | null;
  @Input() coordinates!: ILocationCoordinates | null;
  @Output() coordinatesChange = new EventEmitter<ILocationCoordinates | null>();
  @Output() locationInfo = new EventEmitter<ILocationInfo>();

  map!: maplibregl.Map;
  marker!: maplibregl.Marker;
  customPin!: maplibregl.Marker | null;
  style: IMapStyle = { width: '100%', height: '400px' };

  mapStyles = {
    streets: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    satellite: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
  };

  currentStyle: string = this.mapStyles.streets;
  isSatelliteView: boolean = false;
  isMapDisabled: boolean = true;
  overlayText: string = "Select a city to enable the map";

  async ngOnInit(): Promise<void> {
    if (this.customStyle) {
      this.style = { ...this.customStyle };
    }    

    let coords: ILocationCoordinates = await this.getCoordinates(this.city || 'Belgrade', this.country || 'Serbia');

    if(coords != null && this.coordinates == null) {
      this.initializedMap(coords);
    }
    // this.initializedMap(coords);
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && changes['city'].currentValue) {
      this.updateMap(this.city, this.country);
    }

    if (changes['coordinates'] && changes['coordinates'].currentValue) {
      console.log(this.city, this.country);
      console.log(this.coordinates);
      
      
      this.initializedMap(this.coordinates!);
      this.addCustomMarker(this.coordinates!);
    }
  }

  initializedMap(coords: ILocationCoordinates): void {
    // alert("Map initialized: " + coords.longitude + ", " + coords.lattitude);
    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: this.currentStyle,
      center: [coords.longitude, coords.latitude],
      zoom: 10,
      interactive: false,
      dragPan: false,
      scrollZoom: false,
      boxZoom: false,
      keyboard: false,
      doubleClickZoom: false,
      touchZoomRotate: false
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // this.marker = new maplibregl.Marker();
    this.addToggleButton();
    this.map.on('click', (event) => {
      if (!this.isMapDisabled) {
        let coords: ILocationCoordinates = {
          latitude: event.lngLat.lat,
          longitude: event.lngLat.lng
        }
        this.addCustomMarker(coords);
      }
    });
  }

  async updateMap(city: string, country: string): Promise<void> {
    if (this.customPin) {
      this.customPin.remove();
    }

    if (this.city) {
      this.overlayText = "Loading new location...";
    }

    let coords = await this.getCoordinates(city, country);
    
    if (!coords) return;

    this.disableMapInteractions();

    this.map.flyTo({
    center: [coords.longitude, coords.latitude],
    zoom: 10,
    speed: 1.2,
    curve: 1.42,
    essential: true,
  });

    this.map.once('moveend', () => {
      this.overlayText = "";
      this.enableMapInteractions();
    });

    this.coordinatesChange.emit(this.coordinates ?? null);

  }

  async getCoordinates(city: string, country: string): Promise<ILocationCoordinates | null> {
    const url = `https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        let response: ILocationCoordinates = {
          longitude: parseFloat(data[0].lon),
          latitude: parseFloat(data[0].lat)
        }

        return response;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async getLocationInfo(coords: ILocationCoordinates): Promise<void> {
    // const [lng, lat] = coords;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        let info: ILocationInfo = {
          street: data.address.road,
          houseNumber: data.address.house_number
        };
        
        this.locationInfo.emit(info)
      }
    } catch (error) {
      console.error("Reverse Geocoding Error:", error);
    }
  }

  addCustomMarker(coords: ILocationCoordinates): void {
    if (this.customPin) {
      this.customPin.remove();
    }
    // if (this.marker) {
    //   this.marker.remove();
    // }
    
    this.customPin = new maplibregl.Marker({ color: '#FEFA17' })
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(this.map);

    this.coordinatesChange.emit(coords);
    this.getLocationInfo(coords);
  }

  enableMapInteractions(): void {
    this.isMapDisabled = false;
    this.map.dragPan.enable();
    this.map.scrollZoom.enable();
    this.map.boxZoom.enable();
    this.map.keyboard.enable();
    this.map.doubleClickZoom.enable();
    this.map.touchZoomRotate.enable();
  }

  disableMapInteractions(): void {
    this.isMapDisabled = true;
    this.map.dragPan.disable();
    this.map.scrollZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    this.map.doubleClickZoom.disable();
    this.map.touchZoomRotate.disable();
  }

  addToggleButton(): void {
    const button = document.createElement('button');
    button.innerText = this.isSatelliteView ? 'Street View' : 'Satellite View';
    button.style.position = 'absolute';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.zIndex = '1000';
    button.style.padding = '8px 12px';
    button.style.backgroundColor = 'white';
    button.style.border = '1px solid black';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.color = 'black';
    button.onclick = () => {
      this.toggleMapStyle();
      button.innerText = this.isSatelliteView ? 'Street View' : 'Satellite View';
    };

    this.map.getContainer().appendChild(button);
  }

  toggleMapStyle(): void {
    this.isSatelliteView = !this.isSatelliteView;
    this.currentStyle = this.isSatelliteView ? this.mapStyles.satellite : this.mapStyles.streets;
    this.map.setStyle(this.currentStyle);
  }
}
