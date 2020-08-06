import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = ({ className, style, center, zoom }) => {
  const mapRef = useRef();

  useEffect(() => {
    // Create a map
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
    // render a marker
    new window.google.maps.Marker({
      position: center,
      map,
    });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;
