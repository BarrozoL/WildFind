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
import Errorpage from "./pages/Errorpage";

import PlantListPage from "./pages/PlantListPage";
import PlantDetailsPage from "./pages/PlantDetailsPage";
import AddPlantSightingPage from "./pages/AddPlantSightingPage";

import EditAnimalPage from "./pages/EditAnimalPage";
import EditUserPage from "./pages/EditUserPage"; // Import the EditUserPage
import ResetPasswordPage from "./pages/ResetPasswordPage";

import PersonalWatchlistPage from "./pages/PersonalWatchlistPage";
import WatchDetailsPage from "./pages/WatchDetailsPage";
import SocialFeedPage from "./pages/SocialFeedPage";
import UserProfilePage from "./pages/UserProfilePage";
import PrivateMessagePage from "./pages/PrivateMessagePage";

//Maps
import ChooseMapsPage from "./pages/ChooseMapsPage";
import MapPage from "./pages/MapPage";
import WorldMap from "./maps.svg/WorldMap";
import EuropeMap from "./maps.svg/Europe.map";
import AfricaMap from "./maps.svg/Africa.map";
import SouthAmericaMap from "./maps.svg/SouthAmerica.map";
import NorthAmericaMap from "./maps.svg/NorthAmerica.map";
import AsiaMap from "./maps.svg/Asia.map";
import OceaniaMap from "./maps.svg/Oceania.map";

/* 
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

  // Get all animals that exist in DB
  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        setAnimals(data);
      })
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          exact
          path="/animals"
          element={<AnimalListPage animals={animals} />}
        />
        <Route
          exact
          path={`/animals/:specimenId`}
          element={
            <AnimalDetailsPage
              animals={animals} /* watchState={watchState} */
            />
          }
        />
        <Route
          exact
          path={`/animals/:specimenId/sightings`}
          element={
            <SightingsPage
              /*  getAnimalsWithSightings={getAnimalsWithSightings} */
              sightings={sightings}
            />
          }
        />
        <Route
          exact
          path="/animals/:specimenId/add-sighting"
          element={
            <IsPrivate>
              <AddAnimalSightingPage
                animals={animals}
                /* addAnimalSighting={newSighting} */
              />
            </IsPrivate>
          }
        />
        <Route
          exact
          path="/plants/:specimenId/add-sighting"
          element={
            <IsPrivate>
              <AddPlantSightingPage
                animals={animals}
                /* addAnimalSighting={newSighting} */
              />
            </IsPrivate>
          }
        />
        <Route
          exact
          path="/plants"
          element={<PlantListPage animals={animals} />}
        />
        <Route
          exact
          path={`/plants/:specimenId`}
          element={
            <PlantDetailsPage animals={animals} /* watchState={watchState} */ />
          }
        />
        <Route
          exact
          path={`/plants/:specimenId/sightings`}
          element={
            <SightingsPage
              /*  getAnimalsWithSightings={getAnimalsWithSightings} */
              sightings={sightings}
            />
          }
        />

        <Route
          exact
          path="/animal-add"
          element={
            <IsPrivate>
              <AddAnimalPage
                types={types}
                /*  addAnimal={newAnimal} */
                animals={animals}
                /*   animalState={animalState} */
              />
            </IsPrivate>
          }
        />

        <Route path={`:specimenId/edit`} element={<EditAnimalPage />} />

        <Route
          exact
          path="/watchlist"
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
        <Route path="/watchlist/:userId" element={<PersonalWatchlistPage />} />
        <Route
          exact
          path={`/watchlist/:userId/:watchItemId`}
          element={<WatchDetailsPage />}
        />
        <Route path="/actions" element={<SocialFeedPage />} />
        <Route path="/user-profile/:userId" element={<UserProfilePage />} />

        <Route path="/user/messages/:userId" element={<PrivateMessagePage />} />

        <Route path="/maps" element={<ChooseMapsPage />} />
        <Route path="/maps/south-america" element={<SouthAmericaMap />} />
        <Route path="/maps/north-america" element={<NorthAmericaMap />} />
        <Route path="/maps/europe" element={<EuropeMap />} />
        <Route path="/maps/africa" element={<AfricaMap />} />
        <Route path="/maps/asia" element={<AsiaMap />} />
        <Route path="/maps/oceania" element={<OceaniaMap />} />
        <Route path="/maps/world-map" element={<WorldMap />} />

        <Route
          path="/edit-user/:userId"
          element={
            <IsPrivate>
              <EditUserPage />
            </IsPrivate>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/*" element={<Errorpage />} />
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

       */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
