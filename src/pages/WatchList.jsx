import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WatchCard from "../components/WatchCard";

export default function WatchList({ watches, deleteWatch }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/animal-list");
  };

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

  let filteredWatches = watches.filter((watch) => {
    // Filter by type
    const typeMatch =
      (!type && watch.typeId !== 7 && watch.typeId !== 8) ||
      (type === "Birds" && watch.typeId === 1) ||
      (type === "Mammals" && watch.typeId === 2) ||
      (type === "Reptiles" && watch.typeId === 3) ||
      (type === "Insects" && watch.typeId === 4) ||
      (type === "Amphibians" && watch.typeId === 5) ||
      (type === "Aquatic Animals" && watch.typeId === 6) ||
      (type === "Pets" && watch.typeId === 7) ||
      (type === "Other" && watch.typeId === 8);

    // Filter by name
    const nameMatch = watch.name.toLowerCase().includes(search.toLowerCase());

    return typeMatch && nameMatch;
  });

  const sortedWatches = filteredWatches.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="watch-list">
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

          <button onClick={handleNavigate}>View all animals</button>
        </div>
      </div>

      <div className="watchWrapper">
        {sortedWatches.map((watch) => (
          <WatchCard key={watch.id} watch={watch} deleteWatch={deleteWatch} />
        ))}
      </div>
    </div>
  );
}
