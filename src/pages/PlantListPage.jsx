import { Link } from "react-router-dom";
import { useState } from "react";

export default function PlantList({ plants }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  let filteredPlants = plants.filter((plant) => {
    const nameMatch = plant.name.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });

  return (
    <>
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={handleChange}
      />
      <div className="animalWrapper">
        {filteredPlants.map((plant) => {
          return (
            <Link to={`/plant-list/${plant.id}`}>
              <div className="animal-cards" key={plant.id}>
                <h3 style={{ color: "rgb(44,140,121)" }}>{plant.name}</h3>
                <img width="180px" height="150px;" src={plant.image} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
