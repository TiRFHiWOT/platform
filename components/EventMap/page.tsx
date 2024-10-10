import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const EventMap = ({ eventLocations }) => {
  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const defaultCenter = {
    lat: eventLocations[0]?.latitude || 40.73061,
    lng: eventLocations[0]?.longitude || -73.935242,
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        {eventLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
