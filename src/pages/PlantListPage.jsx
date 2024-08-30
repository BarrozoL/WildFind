/* import { Link } from "react-router-dom";
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
 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";

//Receive the {animals} as a prop from the App, since the state stored and altered there.
export default function AnimalList(/*{ animals }*/) {
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

    // Update the theme state based on the selected type
    if (selectedType === "Other") {
      setTheme("other-theme");
    } else {
      setTheme("");
    }
  };

  // const [movies, setMovies] = useState([]);

  // // Run the effect after the initial render to get a list of movies from the server
  // useEffect(() => {
  //   service.getMovies()
  //     .then((data) => {
  //       // console.log("data", data);
  //       setMovies(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []); //  <-- This effect will run only once, after the initial render

  useEffect(() => {
    if (theme) {
      document.body.classList.add(theme);
    } else {
      document.body.classList.remove("other-theme");
    }
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [theme]);

  let filteredPlants = plants.filter((plant) => {
    // Filter by type
    const typeMatch =
      (!type && plant.typeId !== 7 && plant.typeId !== 8) ||
      (type === "Birds" && plant.typeId === 1) ||
      (type === "Mammals" && plant.typeId === 2) ||
      (type === "Reptiles" && plant.typeId === 3) ||
      (type === "Insects" && plant.typeId === 4) ||
      (type === "Amphibians" && plant.typeId === 5) ||
      (type === "Aquatic Animals" && plant.typeId === 6) ||
      (type === "Pets" && plant.typeId === 7) ||
      (type === "Other" && plant.typeId === 8);

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
        {/*   {console.log(animals)} */}
        <div className="type-select-wrapper">
          <select className="type-select" onChange={handleTypeFilter}>
            <option value="">Show All Plants</option>
            <option value="Birds">Show Birds</option>
            <option value="Mammals">Show Mammals</option>
            <option value="Reptiles">Show Reptiles</option>
            <option value="Insects">Show Insects</option>
            <option value="Amphibians">Show Amphibians</option>
            <option value="Aquatic Animals">Show Aquatic Animals</option>
            <option value="Pets">Show Pets</option>
            <option value="Other">Show Other Animals</option>
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
                <img
                  width="180px"
                  src={plant.image}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
