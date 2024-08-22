import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

function EditWatchPage({ editWatch, watches }) {
  const { watchId } = useParams();

  const foundWatch = watches.find((watch) => watch.id === Number(watchId));

  if (!foundWatch) return <Navigate to="/watch" />;

  const navigate = useNavigate();
  const [name, setName] = useState(foundWatch.name);
  const [description, setDescription] = useState(foundWatch.description);
  const [location, setLocation] = useState(foundWatch.location);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedWatch = {
      ...foundWatch,
      name,
      description,
      location,
    };
    editWatch(updatedWatch);

    navigate("/watch");
  };

  // Use useEffect to add/remove the 'other-theme' class
  useEffect(() => {
    if (foundWatch.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundWatch.typeId]);

  return (
    <div className="add-form">
      <h3>Edit Watch Item</h3>

      <form onSubmit={handleFormSubmit} className="edit-inputs">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label>Location:</label>
        <textarea
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit">Update Watch Item</button>
      </form>
    </div>
  );
}

export default EditWatchPage;
