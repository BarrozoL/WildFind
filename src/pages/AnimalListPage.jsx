import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";
import "../css/AnimalListPage.css";

//Receive the {animals} as a prop from the App, since the state stored and altered there.
export default function AnimalList(/*{ animals }*/) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/animal-add");
  };

  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        // Filter data to include only those with typeId <= 8
        const filteredData = data.filter((animal) => animal.typeId <= 8);
        setAnimals(filteredData);
      })
      .catch((error) => console.error("Error fetching animals:", error));
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

  let filteredAnimals = animals.filter((animal) => {
    // Filter by type
    const typeMatch =
      (!type && animal.typeId !== 7 && animal.typeId !== 8) ||
      (type === "Birds" && animal.typeId === 1) ||
      (type === "Mammals" && animal.typeId === 2) ||
      (type === "Reptiles" && animal.typeId === 3) ||
      (type === "Insects" && animal.typeId === 4) ||
      (type === "Amphibians" && animal.typeId === 5) ||
      (type === "Aquatic Animals" && animal.typeId === 6) ||
      (type === "Pets" && animal.typeId === 7) ||
      (type === "Other" && animal.typeId === 8);

    // Filter by name
    const nameMatch = animal.name.toLowerCase().includes(search.toLowerCase());

    // Return only animals that match both filters
    return typeMatch && nameMatch;
  });

  const sortedAnimals = filteredAnimals.sort((a, b) =>
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
            <option value="">Show All Animals</option>
            <option value="Birds">Show Birds</option>
            <option value="Mammals">Show Mammals</option>
            <option value="Reptiles">Show Reptiles</option>
            <option value="Insects">Show Insects</option>
            <option value="Amphibians">Show Amphibians</option>
            <option value="Aquatic Animals">Show Aquatic Animals</option>
            <option value="Pets">Show Pets</option>
            <option value="Other">Show Other Animals</option>
          </select>

          <button onClick={handleNavigate}>Add a new Animal!</button>
        </div>
      </div>

      <div className="animalWrapper">
        {sortedAnimals.map((animal) => {
          return (
            <Link to={`/animals/${animal._id}`} key={animal._id}>
              <div className="animal-cards">
                <h3>{animal.name}</h3>
                <div
                  style={{
                    width: "180px",
                    height: "130px",
                    // overflow: "hidden",
                    position: "relative",
                    marginLeft: "5%",
                  }}
                >
                  <img
                    // width="100%"
                    // height="100%"
                    src={animal.image}
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
