/* import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlant } from "../../lib";
import "../css/PlantDetailsPage.css";

export default function PlantDetails() {
  const [foundPlant, setFoundPlant] = useState();
  const { plantId } = useParams();
  const navigate = useNavigate();

  const handleNewSighting = () => {
    navigate(`/${plantId}/add-plant-sighting`);
  };

  useEffect(() => {
    getPlant(plantId).then((data) => {
      setFoundPlant(data);
    });
  }, [plantId]);

  if (!foundPlant) return <p>Loading...</p>;

  return (
    <div className="plantDetailWrapper" key={foundPlant.id}>
      {console.log(foundPlant)}
      <h3>{foundPlant.name}</h3>
      <img width="300px" src={foundPlant.image} />
      <p>{foundPlant.description}</p>
      <p>Native to {foundPlant.location}</p>
      <p>{foundPlant.edible}</p>
      <button onClick={handleNewSighting}>Add a sighting</button>
    </div>
  );
}
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { /* addToWatchList, */ getAnimal } from "../../lib";
import { jwtDecode } from "jwt-decode";
/* import jwt_decode from "jwt-decode"; */
import watchService from "../../services/watchlist-service";

export default function PlantCard({ animals }) {
  const [foundPlant, setFoundPlant] = useState();
  const { specimensId } = useParams();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId

  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(specimensId).then((data) => setFoundPlant(data));
    console.log(specimensId);
  }, [specimensId]);

  useEffect(() => {
    if (foundPlant?.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    // Clean up when the component is unmounted or `foundPlant` changes
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundPlant]);

  const handleNavigate = () => {
    navigate("/plant-list");
  };

  const handleWatchNavigate = () => {
    navigate("/watch");
  };

  const handleSightingNavigate = () => {
    navigate(`/plants/${specimensId}/sightings`);
  };

  const handleNewSighting = () => {
    navigate(`/${specimensId}/add-sighting`);
  };

  const handleAddToWatchList = async () => {
    const requestBody = {
      specimenId: specimensId,
      userId: userId,
      typeId: foundPlant.typeId, // Accessing typeId here
      name: foundPlant.name,
      image: foundPlant.image,
      description: foundPlant.description,
      location: foundPlant.location,
      dangerLevel: foundPlant.dangerLevel,
      edible: foundPlant.edible,
    };

    watchService
      .createWatch(userId, requestBody)
      .then((response) => {
        /*  setName("");
        setSelectedAnimalType("") */
        /* setDescription(""); */
        /*  setLocation("");
        setImage(""); */
      })
      .catch((error) => console.log(error));
    navigate("/plants");
  };
  console.log(foundPlant);

  if (!foundPlant) return <p>Loading...</p>;

  return (
    <>
      <div className="animalDetailWrapper">
        <div key={foundPlant._id}></div>
        <h3>{foundPlant.name}</h3>
        <img src={foundPlant.image} alt={foundPlant.name} width="300px" />
        <p>{`Danger level: ${foundPlant.dangerLevel}`}</p>
        <p>{foundPlant.description}</p>
        <p>Native to {foundPlant.location}</p>
        <div className="button-details">
          <button onClick={handleSightingNavigate} className="sightings-button">
            Click to view locations where the {`${foundPlant.name}`} has been
            seen
          </button>
          <button onClick={handleNewSighting} className="detail-button">
            Add a sighting
          </button>
          <button onClick={handleAddToWatchList} className="detail-button">
            Add to Watch List
          </button>
          <button onClick={handleNavigate} className="detail-button">
            Back
          </button>
        </div>
      </div>
    </>
  );
}
