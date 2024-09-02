import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { /* addToWatchList, */ getAnimal } from "../../lib";
import { jwtDecode } from "jwt-decode";
import watchService from "../../services/watchlist-service";
import "../css/AnimalDetailsPage.css";

export default function AnimalCard({ animals }) {
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimensId } = useParams();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId

  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(specimensId).then((data) => setFoundAnimal(data));
  }, [specimensId]);

  useEffect(() => {
    if (foundAnimal?.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    // Clean up when the component is unmounted or `foundAnimal` changes
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundAnimal]);

  const handleNavigate = () => {
    navigate("/animal-list");
  };

  const handleWatchNavigate = () => {
    navigate("/watch");
  };

  const handleSightingNavigate = () => {
    navigate(`/animals/${specimensId}/sightings`);
  };

  const handleNewSighting = () => {
    navigate(`/${specimensId}/add-sighting`);
  };

  const handleAddToWatchList = async () => {
    const requestBody = {
      specimenId: specimensId,
      userId: userId,
      typeId: foundAnimal.typeId, // Accessing typeId here
      name: foundAnimal.name,
      image: foundAnimal.image,
      description: foundAnimal.description,
      location: foundAnimal.location,
      dangerLevel: foundAnimal.dangerLevel,
      edible: foundAnimal.edible,
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
    navigate("/animals");
  };

  if (!foundAnimal) return <p>Loading...</p>;

  return (
    <>
      <div className="animalDetailWrapper">
        <div key={foundAnimal._id}></div>
        <h3>{foundAnimal.name}</h3>
        <img src={foundAnimal.image} alt={foundAnimal.name} width="300px" />
        <p>{`Danger level: ${foundAnimal.dangerLevel}`}</p>
        <p>{foundAnimal.description}</p>
        <p>Native to {foundAnimal.location}</p>
        <div className="button-details">
          <button onClick={handleSightingNavigate} className="sightings-button">
            Click to view locations where the {`${foundAnimal.name}`} has been
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
