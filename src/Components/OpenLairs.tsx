import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { defaults } from "ol/control";
import { Style, Icon } from "ol/style";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import ScaleLine from "ol/control/ScaleLine";
// ... (other imports)
export const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [icon, setIcon] = useState(
    "https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
  );
  setIcon("https://cdn-icons-png.flaticon.com/512/2838/2838912.png");
  const manualMarkers = [
    [10, 2],
    [8, 3],
    [6, 1],
    // Add more coordinates as needed
  ];
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  useEffect(() => {
    const map = new Map({
      target: mapRef.current || undefined,
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      controls: defaults().extend([new ScaleLine()]),
    });
    // Add manual markers
    manualMarkers.forEach((coord) => {
      const [longitude, latitude] = coord;
      const point = new Point(fromLonLat([longitude, latitude]));
      const iconStyle = new Style({
        image: new Icon({
          src: icon,
          anchor: [0.5, 1],
          scale: 0.05, // Adjust the scale as needed
        }),
      });
      const newFeature = new Feature(point);
      newFeature.setStyle(iconStyle);
      vectorSource.addFeature(newFeature);
    });
    return () => {
      map.setTarget(undefined);
    };
  }, [icon, manualMarkers]);
  return <div id="map" ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};