import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const locations = [
  { name: "Marcus Whitman Hotel", position: [46.0686, -118.3430], description: "Starting point of observation, a Renaissance Revival landmark from 1928" },
  { name: "Main Street Corridor", position: [46.0685, -118.3414], description: "Historic commercial district with preserved 19th-century architecture" },
  { name: "Heritage Square", position: [46.0690, -118.3401], description: "Public plaza with the 'Odd Fellows Temple' historical display" },
  { name: "Baker Boyer Bank", position: [46.0689, -118.3420], description: "Washington's first bank, founded in 1869" },
  { name: "Whitman College", position: [46.0722, -118.3302], description: "Liberal arts college established in 1859" }
];

const observationRoute = [
  [46.0686, -118.3430],
  [46.0687, -118.3422],
  [46.0685, -118.3414],
  [46.0683, -118.3410],
  [46.0690, -118.3401],
  [46.0695, -118.3380],
  [46.0705, -118.3340],
  [46.0715, -118.3320],
  [46.0722, -118.3302]
];

export function ObservationMap() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="w-full mb-8">
      <div className="text-left text-xl font-semibold text-foreground mb-2">
        Neighborhood Observation Route
      </div>

      <div className="rounded-lg overflow-hidden border border-border">
        <MapContainer
          center={[46.0700, -118.3370]}
          zoom={15}
          style={{ height: '500px', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker key={index} position={location.position} icon={defaultIcon}>
              <Popup>
                <strong>{location.name}</strong><br />
                {location.description}
              </Popup>
            </Marker>
          ))}
          <Polyline
            positions={observationRoute}
            color="#3B82F6"
            weight={4}
            opacity={0.9}
            dashArray="5, 8"
          />
        </MapContainer>
      </div>

      <div className="mt-3 text-sm font-mono text-muted-foreground pl-2">
        <p>▬ ▬ ▬ Route path through downtown Walla Walla</p>
        <p>📍 Key observation points during the walk</p>
      </div>
    </div>
  );
}

export default ObservationMap;
