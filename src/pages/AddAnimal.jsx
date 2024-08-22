import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnimal } from "../../lib";

import defaultBirdImage from "../assets/images/bird.jpeg";
import defaultMammalImage from "../assets/images/fox.jpeg";
import defaultReptileImage from "../assets/images/lizard.jpeg";
import defaultInsectImage from "../assets/images/beetle.jpeg";
import defaultAmphibianImage from "../assets/images/frog.jpeg";
import defaultAquaticImage from "../assets/images/fish.jpeg";
import defaultPetImage from "../assets/images/dog.jpeg";
import defaultOtherImage from "../assets/images/other-animal.jpeg";

export default function AddAnimal({ types, addAnimal, animals, animalState }) {
  console.log(addAnimal);
  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [danger, setDanger] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSelectedAnimalType = (e) => {
    setSelectedAnimalType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDangerChange = (e) => {
    setDanger(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (!animals) {
    return <div>Loading, no animals...</div>;
  }

  if (animals.length === 0) {
    return <div>Loading, empty animals...</div>;
  }

  const animalExists = (animal) => {
    if (!Array.isArray(animals)) {
      console.log(animals);
      console.error("Animals data is not an array or is undefined.");
      return null;
    }

    const foundAnimal = animals.find(
      (prevAnimal) =>
        prevAnimal.name.toLowerCase() === animal.name.toLowerCase()
    );

    return foundAnimal ? foundAnimal.id : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !location) {
      alert("All fields are mandatory");
      return;
    }

    const existingAnimalId = animalExists({ name });

    if (existingAnimalId) {
      alert(
        "This animal has already been spotted! Please add a new sighting instead. Redirecting to the animal's page."
      );
      navigate(`/animal-list/${existingAnimalId}/`);
      return;
    }

    let animalTypeId = 0;

    for (let i = 0; i < types.length; i++) {
      if (types[i].name === selectedAnimalType) {
        animalTypeId = types[i].id;
      }
    }

    let img;

    if (animalTypeId === 1) {
      img = image || defaultBirdImage;
    } else if (animalTypeId === 2) {
      img = image || defaultMammalImage;
    } else if (animalTypeId === 3) {
      img = image || defaultReptileImage;
    } else if (animalTypeId === 4) {
      img = image || defaultInsectImage;
    } else if (animalTypeId === 5) {
      img = image || defaultAmphibianImage;
    } else if (animalTypeId === 6) {
      img = image || defaultAquaticImage;
    } else if (animalTypeId === 7) {
      img = image || defaultPetImage;
    } else {
      img = image || defaultOtherImage;
    }

    const newAnimal = {
      typeId: animalTypeId,
      name,
      dangerLevel: danger,
      image: img,
      description,
      location,
    };

    addAnimal(newAnimal);

    setName("");
    setDescription("");
    setLocation("");
    setDanger("");
    animalState(newAnimal);
    navigate("/animal-list");
  };

  return (
    <div className="add-form">
      <h1>What and where did you spot?</h1>
      <h3>
        Please check the list of animals to make sure your animal hasn't already
        been added...
      </h3>
      <form className="add-inputs">
        <div>
          <label>Select the type of animal seen:</label>

          <select
            name="animalType"
            id="animalType"
            onChange={handleSelectedAnimalType}
            value={selectedAnimalType}
          >
            <option value=""></option>
            <option value="bird">Bird</option>
            <option value="mammal">Mammal</option>
            <option value="reptile">Reptile</option>
            <option value="insect">Insect</option>
            <option value="amphibian">Amphibian</option>
            <option value="aquatic">Aquatic Animal</option>
            <option value="pet">Pet</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Animal name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label>{`Estimated Danger Level (1-5)`}:</label>
          <input
            type="text"
            name="danger"
            value={danger}
            onChange={handleDangerChange}
            className="danger-input"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label>Native to:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="add-submit">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
