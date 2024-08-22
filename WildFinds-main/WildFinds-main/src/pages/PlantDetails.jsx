import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlant } from "../../lib";

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
