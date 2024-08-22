import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToWatchList, getAnimal } from "../../lib";

export default function AnimalCard({ watchState }) {
  const [foundAnimal, setFoundAnimal] = useState();
  const { animalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(animalId).then((data) => setFoundAnimal(data));
  }, [animalId]);

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
    navigate(`/animal-list/${animalId}/sightings`);
  };

  const handleNewSighting = () => {
    navigate(`/${animalId}/add-sighting`);
  };

  const handleAddToWatchList = async () => {
    try {
      const response = await addToWatchList(
        animalId,
        foundAnimal.typeId,
        foundAnimal.name,
        foundAnimal.image,
        foundAnimal.description,
        foundAnimal.location,
        foundAnimal.dangerLevel
      );
      watchState(response);
      handleWatchNavigate();
      console.log("animal added to watch list", response);
    } catch (error) {
      console.log(error, "can't add to watch list");
    }
  };

  if (!foundAnimal) return <p>Loading...</p>;

  return (
    <>
      <div className="animalDetailWrapper">
        <div key={foundAnimal.id}></div>
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
