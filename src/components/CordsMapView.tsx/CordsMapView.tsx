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

const CordsMapView: React.FC<ICordsMapView> = ({
  coordinates,
  open,
  focusViewport,
}) => {
  const [viewport, setViewport] = useState<ICordsMapViewCoordinates>(
    defaultViewPortCoordinates
  );

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
    <div style={{ height: "300px" }}>
      <MapGL
        mapboxApiAccessToken={`pk.eyJ1IjoiZXJrYW5pc3VmIiwiYSI6ImNrcGZxaHRmNjI0N3UycmxsbWg1Zmt0YXQifQ.tbQo15ubXKR028W_UT5Ibw`}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
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
