import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DataContext } from "../../services/api/dataContext.js";

import disk from "../../assets/svg/mapdot.svg";

// Fix leaflet's default icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: disk,
  iconUrl: disk,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const customIcon = new L.Icon({
  iconRetinaUrl: disk,
  iconUrl: disk,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

const MapData = () => {
  const position = [20, 0]; // Center of the map
  const data = useContext(DataContext);

  if (!data || !Array.isArray(data)) {
    return (
      <div>
        No Data Present
      </div>
    );
  }

  // Group data by country
  const groupedData = data.reduce((acc, item) => {
    const country = item.country || "Unknown";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(item);
    return acc;
  }, {});

  // Get coordinates from country names
  const getLatLngFromCountry = (country) => {
    const countryCoordinates = {
      "United States of America": [37.0902, -95.7129],
      Mexico: [23.6345, -102.5528],
      Nigeria: [9.082, 8.6753],
      Lebanon: [33.8547, 35.8623],
      Russia: [61.524, 105.3188],
      "Saudi Arabia": [23.8859, 45.0792],
      Angola: [-11.2027, 17.8739],
      Egypt: [26.8206, 30.8025],
      "South Africa": [-30.5595, 22.9375],
      India: [20.5937, 78.9629],
      Ukraine: [48.3794, 31.1656],
      Azerbaijan: [40.1431, 47.5769],
      China: [35.8617, 104.1954],
      Colombia: [4.5709, -74.2973],
      Niger: [17.6078, 8.0817],
      Libya: [26.3351, 17.2283],
      Brazil: [-14.235, -51.9253],
      Mali: [17.5707, -3.9962],
      Indonesia: [-0.7893, 113.9213],
      Iraq: [33.2232, 43.6793],
      Iran: [32.4279, 53.688],
      "South Sudan": [6.877, 31.307],
      Venezuela: [6.4238, -66.5897],
      "Burkina Faso": [12.2383, -1.5616],
      Germany: [51.1657, 10.4515],
      "United Kingdom": [55.3781, -3.436],
      Kuwait: [29.3117, 47.4818],
      Canada: [56.1304, -106.3468],
      Argentina: [-38.4161, -63.6167],
      Japan: [36.2048, 138.2529],
      Austria: [47.5162, 14.5501],
      Spain: [40.4637, -3.7492],
      Estonia: [58.5953, 25.0136],
      Hungary: [47.1625, 19.5033],
      Australia: [-25.2744, 133.7751],
      Morocco: [31.7917, -7.0926],
      Greece: [39.0742, 21.8243],
      Qatar: [25.3548, 51.1839],
      Oman: [21.4735, 55.9754],
      Liberia: [6.4281, -9.4295],
      Denmark: [56.2639, 9.5018],
      Malaysia: [4.2105, 101.9758],
      Jordan: [30.5852, 36.2384],
      Syria: [34.8021, 38.9968],
      Ethiopia: [9.145, 40.4897],
      Norway: [60.472, 8.4689],
      Ghana: [7.9465, -1.0232],
      Kazakhstan: [48.0196, 66.9237],
      Pakistan: [30.3753, 69.3451],
      Gabon: [-0.8037, 11.6094],
      "United Arab Emirates": [23.4241, 53.8478],
      Algeria: [28.0339, 1.6596],
      Turkey: [38.9637, 35.2433],
      Cyprus: [35.1264, 33.4299],
      Belize: [17.1899, -88.4976],
      Poland: [51.9194, 19.1451],
    };
    return countryCoordinates[country] || null;
  };

  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {Object.entries(groupedData).map(([country, reports]) => {
        const countryLatLng = getLatLngFromCountry(country);
        return countryLatLng ? (
          <Marker key={country} position={countryLatLng} icon={customIcon}>
            <Popup>
              <div>
                <strong>{country}</strong>
                <br />
                {reports.map((report, index) => (
                  <div key={index}>
                    <strong>{report.title}</strong>
                    <br />
                    Intensity: {report.intensity}, Relevance: {report.relevance}
                    , Likelihood: {report.likelihood}
                    <br />
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                    <hr />
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ) : null;
      })}
    </MapContainer>
  );
};

export default MapData;
