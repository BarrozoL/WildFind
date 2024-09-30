import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";
import "../css/AnimalListPage.css";

export default function AnimalList() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/animal-add");
  };

  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        // Filter data to include only those with typeId <= 8
        const filteredData = data.filter(
          (plant) => plant.typeId > 8 && plant.typeId < 13
        );
        setPlants(filteredData);
      })
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleTypeFilter = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
  };

  let filteredPlants = plants.filter((plant) => {
    // Filter by type
    const typeMatch =
      !type ||
      (type === "Trees" && plant.typeId === 9) ||
      (type === "Berries" && plant.typeId === 10) ||
      (type === "Flowers" && plant.typeId === 11) ||
      (type === "Other" && plant.typeId === 12);

    // Filter by name
    const nameMatch = plant.name.toLowerCase().includes(search.toLowerCase());

    // Return only animals that match both filters
    return typeMatch && nameMatch;
  });

  const sortedPlants = filteredPlants.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="animal-list">
      <div className="sidebar">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="type-select-wrapper">
          <select className="type-select" onChange={handleTypeFilter}>
            <option value="">Show All Plants</option>
            <option value="Trees">Show Trees</option>
            <option value="Berries">Show Fruit</option>
            <option value="Flowers">Show Flowers</option>
            <option value="Other">Show Other Plants</option>
          </select>

          <button onClick={handleNavigate}>Add a new Plant!</button>
        </div>
      </div>

      <div className="animalWrapper">
        {sortedPlants.map((plant) => {
          return (
            <Link to={`/plants/${plant._id}`} key={plant._id}>
              <div className="animal-cards">
                <h3>{plant.name}</h3>
                <div
                  style={{
                    width: "180px",
                    height: "130px",
                    position: "relative",
                    marginLeft: "5%",
                  }}
                >
                  <img
                    src={plant.image}
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      marginTop: "5%",
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
