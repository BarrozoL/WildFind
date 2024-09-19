import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { /* addToWatchList, */ getAnimal, deleteAnimal } from "../../lib";
import { jwtDecode } from "jwt-decode";
import watchService from "../../services/watchlist-service";
import "../css/AnimalDetailsPage.css";

export default function AnimalCard({ animals }) {
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimenId } = useParams();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const username = decodedToken ? decodedToken.username : null; // Extract username

  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(specimenId).then((data) => setFoundAnimal(data));
  }, [specimenId]);

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
    navigate("/animals");
  };

  const handleWatchNavigate = () => {
    navigate("/watchlist");
  };

  const handleSightingNavigate = () => {
    navigate(`/animals/${specimenId}/sightings`);
  };

  const handleEdit = () => {
    navigate(`/${specimenId}/edit`);
  };

  const handleNewSighting = () => {
    navigate(`/animals/${specimenId}/add-sighting`);
  };

  const handleAddToWatchList = async () => {
    const requestBody = {
      specimenId: specimenId,
      userId: userId,
      typeId: foundAnimal?.typeId, // Accessing typeId here
      name: foundAnimal?.name,
      image: foundAnimal?.image,
      description: foundAnimal?.description,
      location: foundAnimal?.location,
      dangerLevel: foundAnimal?.dangerLevel,
      edible: foundAnimal?.edible,
      note: "",
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
    console.log("foundAnimal?.location:", foundAnimal?.location);
    navigate(`/watchlist/${userId}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this animal?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAnimal(specimenId);
      navigate("/animals");
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("There was an error deleting the animal. Please try again.");
    }
  };

  if (!foundAnimal) return <p>Loading...</p>;

  return (
    <>
      <div
        className="animalDetailWrapper"
        style={{ margin: "20% 0 20% 0", height: "90vh" }}
      >
        <div key={foundAnimal?._id}></div>
        <h3>{foundAnimal?.name}</h3>
        <img src={foundAnimal.image} alt={foundAnimal?.name} width="300px" />
        <p>{`Danger level: ${foundAnimal?.dangerLevel}`}</p>
        <p>{`Description: ${foundAnimal?.description}`}</p>
        <p>{`Native to: ${foundAnimal?.location.join(", ")}`}</p>

        <button onClick={handleSightingNavigate} className="sightings-button">
          Click to view locations where the {`${foundAnimal?.name}`} has been
          seen
        </button>
        <div className="button-details">
          {/* <button onClick={handleSightingNavigate} className="sightings-button">
            Click to view locations where the {`${foundAnimal.name}`} has been
            seen
          </button> */}
          {foundAnimal.userId === userId && (
            <button onClick={handleEdit} className="detail-button">
              Edit
            </button>
          )}
          {foundAnimal.userId === userId && (
            <button onClick={handleDelete} className="detail-button">
              Delete
            </button>
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
