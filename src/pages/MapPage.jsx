import { useState, useEffect } from "react";
import axios from "axios";
import "./Map.css";
import Map from "../components/Map";
import MapListing from "../components/MapListing";

export default function MapPage({
  getAnimalsWithSightings,
  getPlantsWithSightings,
}) {
  const [location, setLocation] = useState([]);
  const [animalSightings, setAnimalSightings] = useState([]);
  const [plantSightings, setPlantSightings] = useState([]);

  const ANIMALS_DB = "http://localhost:5005";

  /*  useEffect(() => {
    getAnimalsWithSightings().then((data) => setAnimalSightings(data));
  }, [setLocation]); */

  /* 
  useEffect(() => {
    getPlantsWithSightings().then((data) => setPlantSightings(data));
  }, [setLocation]);
 */

  const getSightingsByLocation = async () => {
    try {
      const response = await axios.get(`${ANIMALS_DB}/sightings/${location}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  function findLocation(e) {
    setLocation(e.target.id);
  }

  let matchingPlants = new Set([]);

  plantSightings.map((plant) => {
    plant.sightings.map((sight) => {
      if (location === sight.location) {
        console.log("this is a plant", plant, matchingPlants);
        matchingPlants.add(plant);
      }
    });
  });

  let matchingAnimals = new Set([]);

  animalSightings.map((animal) => {
    animal.sightings.map((sight) => {
      if (location === sight.location) {
        matchingAnimals.add(animal);
      }
    });
  });

  return (
    <>
      <Map findLocation={findLocation} />
      <MapListing
        location={location}
        matchingAnimals={matchingAnimals}
        matchingPlants={matchingPlants}
      />
    </>
  );
}
