import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import specimenService from "../../services/specimen-service";

import defaultBirdImage from "../assets/images/bird.jpeg";
import defaultMammalImage from "../assets/images/fox.jpeg";
import defaultReptileImage from "../assets/images/lizard.jpeg";
import defaultInsectImage from "../assets/images/beetle.jpeg";
import defaultAmphibianImage from "../assets/images/frog.jpeg";
import defaultAquaticImage from "../assets/images/fish.jpeg";
import defaultPetImage from "../assets/images/dog.jpeg";
import defaultOtherImage from "../assets/images/other-animal.jpeg";

export default function AddAnimal({ types, addAnimal, animals, animalState }) {
  /*console.log(addAnimal);*/
  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [danger, setDanger] = useState("");
  const [edible, setEdible] = useState("");
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

  const handleEdibleChange = (e) => {
    setEdible(e.target.value);
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

    let typeId;

    const existingAnimalId = animalExists({ name });

    if (existingAnimalId) {
      alert(
        "This animal has already been spotted! Please add a new sighting instead. Redirecting to the animal's page."
      );
      navigate(`/animal-list/${existingAnimalId}/`);
      return;
    }

    if (selectedAnimalType === "bird") {
      typeId = 1;
    } else if (selectedAnimalType === "mammal") {
      typeId = 2;
    } else if (selectedAnimalType === "reptile") {
      typeId = 3;
    } else if (selectedAnimalType === "insect") {
      typeId = 4;
    } else if (selectedAnimalType === "amphibian") {
      typeId = 5;
    } else if (selectedAnimalType === "aquatic") {
      typeId = 6;
    } else if (selectedAnimalType === "pet") {
      typeId = 7;
    } else if (selectedAnimalType === "other") {
      typeId = 8;
    }

    //we had a section of our old database that was just an array of type objects: id and name. the ids were 1-8.
    //maybe we need to change things so that we have a document with different types and then typeId is something that isnt 1-13 but rather the actual id of that type

    if (!name || !description || !location || !typeId) {
      alert("All fields are mandatory");
      return;
    }

    let img;

    if (typeId === 1) {
      img = image || defaultBirdImage;
    } else if (typeId === 2) {
      img = image || defaultMammalImage;
    } else if (typeId === 3) {
      img = image || defaultReptileImage;
    } else if (typeId === 4) {
      img = image || defaultInsectImage;
    } else if (typeId === 5) {
      img = image || defaultAmphibianImage;
    } else if (typeId === 6) {
      img = image || defaultAquaticImage;
    } else if (typeId === 7) {
      img = image || defaultPetImage;
    } else {
      img = image || defaultOtherImage;
    }

    /*    const newAnimal = {
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
    navigate("/animal-list"); */

    const requestBody = {
      name,
      typeId,
      description,
      location,
      image,
    };

    specimenService
      .createSpecimen(requestBody)
      .then((response) => {
        console.log(typeId);
        setName("");
        setSelectedAnimalType("");
        setDescription("");
        setLocation("");
        setImage("");
      })
      .catch((error) => console.log(error));
    navigate("/specimens");
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
