import React, { useEffect, useState } from "react";

import MapGL, {
  Popup,
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import {
  defaultViewPortCoordinates,
  fullscreenControlStyle,
  geolocateStyle,
  navStyle,
  scaleControlStyle,
} from "../../helpers/defaultVariables";
import {
  ICordsMapView,
  ICordsMapViewCoordinates,
} from "../../types/cordsMapViewTypes";
import mapboxgl from "mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
const CordsMapView: React.FC<ICordsMapView> = ({
  coordinates,
  open,
  focusViewport,
}) => {
  const [viewport, setViewport] = useState<ICordsMapViewCoordinates>(
    defaultViewPortCoordinates
  ); // focuses the center of map to the coordinates

  useEffect(() => {
    setViewport({
      latitude: focusViewport.lat,
      longitude: focusViewport.lon,
      zoom: 15,
      bearing: 0,
      pitch: 0,
    });
  }, [focusViewport]);
  if (!open) {
    return <></>;
  }
  return (
    <div id="map" style={{ height: "300px" }}>
      <MapGL
        mapboxApiAccessToken={`pk.eyJ1IjoiZXJrYW5pc3VmIiwiYSI6ImNrcGZxaHRmNjI0N3UycmxsbWg1Zmt0YXQifQ.tbQo15ubXKR028W_UT5Ibw`} //Key is public for the assingment but usually should be in .env
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="100%"
        scrollZoom={true}
        onViewportChange={setViewport}
      >
        {coordinates.map((el, index) => {
          return (
            <div style={{ padding: "15px" }} key={index}>
              {" "}
              <Marker
                longitude={el.properties.lon}
                latitude={el.properties.lat}
              ></Marker>
              <Popup
                tipSize={12}
                anchor="top"
                longitude={el.properties.lon}
                latitude={el.properties.lat}
                closeOnClick={false}
                closeButton={false}
              >
                <p style={{ fontSize: "12px" }}>{el.properties.formatted}</p>
              </Popup>
            </div>
          );
        })}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </div>
  );
};

export default CordsMapView;
