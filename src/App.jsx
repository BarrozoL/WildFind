import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Homepage from "./pages/Homepage";
import AnimalListPage from "./pages/AnimalListPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage";
import SightingsPage from "./pages/SightingsPage";
import AddAnimalSightingPage from "./pages/AddAnimalSightingPage";
import AddAnimalPage from "./pages/AddAnimalPage";
import WatchListPage from "./pages/WatchListPage";
import MapPage from "./pages/MapPage";
import PersonalWatchlistPage from "./pages/PersonalWatchlistPage";
import SocialFeedPage from "./pages/SocialFeedPage";
/* import Errorpage from "./pages/Errorpage";

import WatchDetailsPage from "./pages/WatchDetailsPage"; */
/* 

import EditWatchPage from "./pages/EditWatchPage";


import AddPlantSightingPage from "./pages/AddPlantSightingPage";
import PlantListPage from "./pages/PlantListPage";
import PlantDetailsPage from "./pages/PlantDetailsPage"; */

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import IsUnique from "./components/IsUnique";

// Components

// Functions
import {
  getAllAnimals,
  addAnimalSighting,
  getAnimalsWithSightings,
  /* getAllWatches,
  deleteWatchItem,
  updateWatch,
  getTypes,
  addAnimal,
 
  getAnimalSightings,
 
  getAllPlants,
  addPlantSighting,
  getPlantsWithSightings, */
} from "../lib";

function App() {
  const [types, setTypes] = useState([]);
  const [animals, setAnimals] = useState([]); //animal state relates to the request and holds all specimens. change this later
  const [watches, setWatches] = useState([]);
  const [sightings, setSightings] = useState([""]);
  const [plants, setPlants] = useState([]);

  // document.title = "WildFind";

  /*   useEffect(() => {
    getAllPlants().then((data) => setPlants(data));
  }, []);

  // Get the existing types of animals
  useEffect(() => {
    getTypes().then((data) => setTypes(data));
  }, []); */

  // Get all animals that exist in DB
  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        setAnimals(data);
      })
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  // Add sighting
  const newSighting = (sighting) => {
    addAnimalSighting(sighting).then((newSight) =>
      setSightings([...sightings, newSight])
    );
  };

  //updates animals state, will be passed to AddAnimal (fixes reload problem of animal list after adding animal)
  /*  const animalState = (newAnimal) => {
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
    getAnimalSightings().then((data) => setSightings(data));
  }, []);



  const newPlantSighting = (sighting) => {
    addPlantSighting(sighting).then((newSight) =>
      setSightings([...sightings, newSight])
    );
  }; */

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          exact
          path="/specimens"
          element={<AnimalListPage animals={animals} />}
        />
        <Route
          exact
          path={`/specimens/:specimensId`}
          element={
            <AnimalDetailsPage
              animals={animals} /* watchState={watchState} */
            />
          }
        />
        <Route
          exact
          path={`/specimens/:specimenId/sightings`}
          element={
            <SightingsPage
              /*  getAnimalsWithSightings={getAnimalsWithSightings} */
              sightings={sightings}
            />
          }
        />
        <Route
          exact
          path="/:specimenId/add-sighting"
          element={
            <AddAnimalSightingPage
              animals={animals}
              addAnimalSighting={newSighting}
            />
          }
        />
        <Route
          exact
          path="/animal-add"
          element={
            <AddAnimalPage
              types={types}
              /*  addAnimal={newAnimal} */
              animals={animals}
              /*   animalState={animalState} */
            />
          }
        />
        <Route
          exact
          path="/watch"
          element={
            <IsPrivate>
              <WatchListPage watches={watches} /*deleteWatch={deleteWatch}*/ />
            </IsPrivate>
          }
        />
        <Route
          exact
          path={"/map"}
          element={
            <MapPage
              plants={plants}
              /* getPlantsWithSightings={getPlantsWithSightings}
               */
              getAnimalsWithSightings={getAnimalsWithSightings}
              sightings={sightings}
              animals={animals}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <IsUnique>
              <PersonalWatchlistPage />
            </IsUnique>
          }
        />
        <Route path="/actions" element={<SocialFeedPage />} />
        {/* 

        <Route
          exact
          path="/animal-add"

          path="/:plantId/add-plant-sighting"
          element={
            <AddPlantSightingPage
              plants={plants}
              addPlantSighting={newPlantSighting}
            />
          }
        />


        <Route path="/plant-list" element={<PlantListPage plants={plants} />} />

        <Route path="/plant-list/:plantId" element={<PlantDetailsPage />} />

        <Route
          path="/watch/:watchId/edit-watch"
          element={<EditWatchPage editWatch={editWatch} watches={watches} />}
        />

        <Route path="/watch/:watchId/details" element={<WatchDetailsPage />} />

        <Route path="/*" element={<Errorpage />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
