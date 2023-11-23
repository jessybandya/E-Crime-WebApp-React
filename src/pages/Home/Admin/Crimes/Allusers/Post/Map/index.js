import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function Map({ lat, long, description, title }) {

  const position = [lat, long]
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        {title} <br /> <hr />{description}
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default Map