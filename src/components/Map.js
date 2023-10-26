/*import React, { Component } from 'react'; navigator.geolocation;

class MapContainer extends Component {
  componentDidMount() {
    // Carregue a API do Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2pEHW5yBs6BICZAw0u65ykJ1iHXsG_to&callback=initMap`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      this.initMap();
    };

    document.head.appendChild(script);
  }

  initMap() {
    // Crie um novo mapa
    new window.google.maps.Map(this.refs.map, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 14,
    });
  }

  render() {
    return <div ref="map" style={{ width: '100%', height: '400px' }} />;
  }
}

export default MapContainer;*/

import React, { Component } from 'react';
import './Map.css'

class MapContainer extends Component {
  mapRef = React.createRef();

  componentDidMount() {
    this.loadGoogleMapScript();
  }

  loadGoogleMapScript() {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2pEHW5yBs6BICZAw0u65ykJ1iHXsG_to&callback=initMap`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        this.initMap();
      };

      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap() {
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };

    // Se a geolocalização estiver disponível, use-a. Caso contrário, use a localização padrão.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          new window.google.maps.Map(this.mapRef.current, {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 14,
          });
        },
        () => {
          new window.google.maps.Map(this.mapRef.current, {
            center: defaultLocation,
            zoom: 14,
          });
        }
      );
    } else {
      new window.google.maps.Map(this.mapRef.current, {
        center: defaultLocation,
        zoom: 14,
      });
    }
  }

  render() {
    return <div ref={this.mapRef} className="map-container" />;
  }
}

export default MapContainer;
