import { Link } from "react-router-dom";

export default function MapListing({ location, sightings }) {
  /* const firstSightingLocation = animalsArray.find((animal) => {
    animal.sightings && animal.sightings[0] && animal.sightings[0].location;
  }); */

  return (
    <>
      <div className="map-wrap">
        <div className="map-sightings">
          <div>
            {" "}
            {location.length > 0 ? (
              <h2 className="location-tag">Sightings in: {location}</h2>
            ) : (
              ""
            )}
          </div>
          <div className="sighting-card">
            {console.log("mapList sightings", sightings)}
            {sightings.map((sight) => (
              <div key={sight._id}>
                <h4 style={{ color: "rgb(44, 140, 121)", width: "100px" }}>
                  {sight.specimenId.name}
                </h4>
                <img width="100px" src={sight.specimenId.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
