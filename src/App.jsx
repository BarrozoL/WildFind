import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Homepage from "./pages/Homepage";
import AnimalList from "./pages/AnimalList";
import Errorpage from "./pages/Errorpage";
import AnimalCard from "./pages/AnimalCard";
import WatchList from "./pages/WatchList";
import Sightings from "./pages/Sightings";
import WatchDetails from "./pages/WatchDetails";

import AddSighting from "./pages/AddSighting";
import EditWatchPage from "./pages/EditWatch";
import AddAnimal from "./pages/AddAnimal";
import MapPage from "./pages/MapPage";
import AddPlantSighting from "./pages/AddPlantSighting";

// Components
import WatchCard from "./components/WatchCard";

// Functions
import {
  getAllAnimals,
  getAllWatches,
  deleteWatchItem,
  updateWatch,
  getTypes,
  addAnimal,
  addSighting,
  getSightings,
  getAnimalsWithSightings,
  getAllPlants,
  addPlantSighting,
  getPlantsWithSightings,
} from "../lib";
import PlantList from "./pages/PlantList";
import PlantDetails from "./pages/PlantDetails";

function App() {
  const [types, setTypes] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [watches, setWatches] = useState([]);
  const [sightings, setSightings] = useState([""]);
  const [plants, setPlants] = useState([]);

  // document.title = "WildFind";

  useEffect(() => {
    getAllPlants().then((data) => setPlants(data));
  }, []);

  // Get the existing types of animals
  useEffect(() => {
    getTypes().then((data) => setTypes(data));
  }, []);

  // Get all animals that exist in DB
  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        setAnimals(data);
      })
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  //updates animals state, will be passed to AddAnimal (fixes reload problem of animal list after adding animal)
  const animalState = (newAnimal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
  };

  // Add a new animal

  const newAnimal = (animal) => {
    addAnimal(animal).then((newAnimal) => setAnimals([...animals, newAnimal]));
  };

  // Get all watching animals

  useEffect(() => {
    getAllWatches()
      .then((data) => {
        setWatches(data);
      })
      .catch((error) => console.error("Error fetching watches:", error));
  }, []);

  //updates watches state, will be passed to AnimalCard
  const watchState = (newWatch) => {
    setWatches((prevWatches) => [...prevWatches, newWatch]);
  };

  // Delete watching animal
  const deleteWatch = (id) => {
    deleteWatchItem(id)
      .then(() => {
        setWatches(watches.filter((watch) => watch.id !== id));
      })
      .catch((error) => console.error("Error deleting watch:", error));
  };

  // Edit watch animal
  const editWatch = (watchItem) => {
    updateWatch(watchItem)
      .then((data) => {
        setWatches(
          watches.map((watch) => (data.id === watch.id ? data : watch))
        );
      })
      .catch((error) => console.error("Error updating watch:", error));
  };

  // Get all sightings
  useEffect(() => {
    getSightings().then((data) => setSightings(data));
  }, []);

  // Add sighting
  const newSighting = (sighting) => {
    addSighting(sighting).then((newSight) =>
      setSightings([...sightings, newSight])
    );
  };

  const newPlantSighting = (sighting) => {
    addPlantSighting(sighting).then((newSight) =>
      setSightings([...sightings, newSight])
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/animal-list" element={<AnimalList animals={animals} />} />
        <Route
          path="/:animalId/add-sighting"
          element={<AddSighting animals={animals} addSighting={newSighting} />}
        />

        <Route
          path="/:plantId/add-plant-sighting"
          element={
            <AddPlantSighting
              plants={plants}
              addPlantSighting={newPlantSighting}
            />
          }
        />

        <Route
          path={`/animal-list/:animalId`}
          element={<AnimalCard watchState={watchState} />}
        />

        <Route path="/plant-list" element={<PlantList plants={plants} />} />

        <Route path="/plant-list/:plantId" element={<PlantDetails />} />

        <Route
          path="/watch"
          element={<WatchList watches={watches} deleteWatch={deleteWatch} />}
        />

        <Route
          path="/watch/:watchId/edit-watch"
          element={<EditWatchPage editWatch={editWatch} watches={watches} />}
        />

        <Route path="/watch/:watchId/details" element={<WatchDetails />} />

        <Route
          path={`/animal-list/:animalId/sightings`}
          element={
            <Sightings
              getAnimalsWithSightings={getAnimalsWithSightings}
              sightings={sightings}
            />
          }
        />

        <Route
          path={"/map"}
          element={
            <MapPage
              plants={plants}
              getPlantsWithSightings={getPlantsWithSightings}
              getAnimalsWithSightings={getAnimalsWithSightings}
              sightings={sightings}
              animals={animals}
            />
          }
        />

        <Route
          path="/animal-add"
          element={
            <AddAnimal
              types={types}
              addAnimal={newAnimal}
              animals={animals}
              animalState={animalState}
            />
          }
        />

        <Route path="/*" element={<Errorpage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
