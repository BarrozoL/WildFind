import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Map.css";
import Map from "../components/Map";

export default function MapPage({}) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [sightings, setSightings] = useState([]);

  const ANIMALS_DB = "http://localhost:5005";

  useEffect(() => {
    getMapSightings();
  }, []);

  const getMapSightings = async () => {
    axios
      .get(`${ANIMALS_DB}/api/sightings`)
      .then((response) => {
        setSightings(response.data);
      })
      .catch((error) => {
        console.log("Error getting sightings", error);
      });
  };

  // Filter over sightings to find match between selected location and sightings
  const matchingLocationSightings = sightings.filter((sighting) => {
    return sighting?.district?.name === selectedDistrict;
  });

  console.log("matching location sightings", matchingLocationSightings);

  function findLocation(e) {
    setSelectedDistrict(e.target.id);
  }
  console.log("selected location", selectedDistrict);

  return (
    <>
      <div className="map-wrapper">
        <Map findLocation={findLocation} />
      </div>

      <div className="map-wrap">
        <div className="map-sightings">
          <div>
            {matchingLocationSightings.length > 0 ? (
              <h2 className="location-tag">Sightings in {selectedDistrict}</h2>
            ) : null}
          </div>
          <div className="sighting-card">
            {matchingLocationSightings?.map((sight) => {
              return (
                <div key={sight?._id}>
                  <Link to={`/animals/${sight?.specimenId?._id}`}>
                    <h4 style={{ color: "rgb(44, 140, 121)", width: "100px" }}>
                      {sight?.specimenId?.name}
                      {console.log("sight", sight)}
                    </h4>
                    <img width="100px" src={sight?.specimenId?.image} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
