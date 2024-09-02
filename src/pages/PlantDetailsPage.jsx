import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { /* addToWatchList, */ getAnimal, deleteAnimal } from "../../lib";
import { jwtDecode } from "jwt-decode";
import watchService from "../../services/watchlist-service";
import "../css/AnimalDetailsPage.css";

export default function AnimalCard({ animals }) {
  const [foundPlant, setFoundPlant] = useState();
  const { specimenId } = useParams();
  console.log("specimenId:", specimenId);
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const username = decodedToken ? decodedToken.username : null; // Extract username

  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(specimenId).then((data) => setFoundPlant(data));
  }, [specimenId]);

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
    navigate("/plants");
  };

  const handleWatchNavigate = () => {
    navigate("/watchlist");
  };

  const handleSightingNavigate = () => {
    navigate(`/plants/${specimenId}/sightings`);
  };

  const handleEdit = () => {
    navigate(`/${specimenId}/edit`);
  };

  const handleNewSighting = () => {
    navigate(`/plants/${specimenId}/add-sighting`);
  };

  const handleAddToWatchList = async () => {
    const requestBody = {
      specimenId: specimenId,
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAnimal(specimenId);
      navigate("/plants");
    } catch (error) {
      console.error("Error deleting plant:", error);
      alert("There was an error deleting the plant. Please try again.");
    }
  };

  if (!foundPlant) return <p>Loading...</p>;

  return (
    <>
      <div className="animalDetailWrapper">
        <div key={foundPlant._id}></div>
        <h3>{foundPlant.name}</h3>
        {console.log(foundPlant)}
        <img src={foundPlant.image} alt={foundPlant.name} width="300px" />
        <p>{`Edible: ${foundPlant.edible}`}</p>
        <p>{`Description: ${foundPlant.description}`}</p>
        <p>Native to {foundPlant.location}</p>
        <div className="button-details">
          <button onClick={handleSightingNavigate} className="sightings-button">
            Click to view locations where the {`${foundPlant.name}`} has been
            seen
          </button>
          {foundPlant.userId === userId && (
            <button onClick={handleEdit}>Edit</button>
          )}
          {foundPlant.userId === userId && (
            <button onClick={handleDelete}>Delete</button>
          )}
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
