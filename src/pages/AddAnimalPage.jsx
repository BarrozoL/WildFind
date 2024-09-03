import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";
import "../css/AddAnimalPage.css";
import { jwtDecode } from "jwt-decode";

import specimenService from "../../services/specimen-service";

import defaultBirdImage from "../assets/images/bird.jpeg";
import defaultMammalImage from "../assets/images/fox.jpeg";
import defaultReptileImage from "../assets/images/lizard.jpeg";
import defaultInsectImage from "../assets/images/beetle.jpeg";
import defaultAmphibianImage from "../assets/images/frog.jpeg";
import defaultAquaticImage from "../assets/images/fish.jpeg";
import defaultPetImage from "../assets/images/dog.jpeg";
import defaultOtherImage from "../assets/images/other-animal.jpeg";
import defaultTreeImage from "../assets/images/tree.jpeg";
import defaultBerryImage from "../assets/images/berry.jpeg";
import defaultFlowerImage from "../assets/images/flower.jpeg";
import defaultPlantImage from "../assets/images/plant.jpeg";

export default function AddAnimal() {
  const [animals, setAnimals] = useState([]);

  //Retrieving the user's authToken token from the localStorage
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const username = decodedToken ? decodedToken.username : null; // Extract username

  /*console.log(addAnimal);*/
  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [danger, setDanger] = useState("");
  const [edible, setEdible] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAnimal, setIsAnimal] = useState("");

  useEffect(() => {
    getAllAnimals()
      .then((data) => {
        // Filter data to include only those with typeId <= 8
        const filteredData = data.filter((animal) => animal.typeId <= 8);
        setAnimals(filteredData);
        console.log(animals);
      })
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setIsAnimal(e.target.value);
  };

  const handleSelectedAnimalType = (e) => {
    setSelectedAnimalType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.value);
  // };

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

    return foundAnimal ? foundAnimal._id : null;
  };

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]); // Append the file with the key "imageUrl"

    specimenService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);

        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let typeId;

    const existingAnimalId = animalExists({ name });

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
    } else if (selectedAnimalType === "other-animal") {
      typeId = 8;
    } else if (selectedAnimalType === "tree") {
      typeId = 9;
    } else if (selectedAnimalType === "berry") {
      typeId = 10;
    } else if (selectedAnimalType === "flower") {
      typeId = 11;
    } else if (selectedAnimalType === "other-plant") {
      typeId = 12;
    }

    if (existingAnimalId && typeId <= 8) {
      alert(
        "This animal has already been spotted! Please add a new sighting instead. Redirecting to the animal's page."
      );
      navigate(`/animals/${existingAnimalId}/`);
      return;
    }

    if (existingAnimalId && typeId > 8 && typeId < 13) {
      alert(
        "This plant has already been spotted! Please add a new sighting instead. Redirecting to the plant's page."
      );
      navigate(`/plants/${existingAnimalId}/`);
      return;
    }

    //we had a section of our old database that was just an array of type objects: id and name. the ids were 1-8.
    //maybe we need to change things so that we have a document with different types and then typeId is something that isnt 1-13 but rather the actual id of that type

    if (!name || !description || !typeId) {
      alert("All fields are mandatory");
      return;
    }

    let img;

    if (typeId === 1) {
      img = imageUrl || defaultBirdImage;
    } else if (typeId === 2) {
      img = imageUrl || defaultMammalImage;
    } else if (typeId === 3) {
      img = imageUrl || defaultReptileImage;
    } else if (typeId === 4) {
      img = imageUrl || defaultInsectImage;
    } else if (typeId === 5) {
      img = imageUrl || defaultAmphibianImage;
    } else if (typeId === 6) {
      img = imageUrl || defaultAquaticImage;
    } else if (typeId === 7) {
      img = imageUrl || defaultPetImage;
    } else if (typeId === 8) {
      img = imageUrl || defaultOtherImage;
    } else if (typeId === 9) {
      img = imageUrl || defaultTreeImage;
    } else if (typeId === 10) {
      img = imageUrl || defaultBerryImage;
    } else if (typeId === 11) {
      img = imageUrl || defaultFlowerImage;
    } else if (typeId === 12) {
      img = imageUrl || defaultPlantImage;
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
      username,
      userId,
      name,
      typeId,
      description,
      location,
      dangerLevel: danger,
      image: img,
      edible,
    };

    specimenService
      .createSpecimen(requestBody)
      .then((response) => {
        console.log(typeId);
        setName("");
        setSelectedAnimalType("");
        setDescription("");
        setLocation("");
        setDanger("");
        setImageUrl("");
        setEdible("");
      })
      .catch((error) => console.log(error));
    if (typeId <= 8) {
      navigate("/animals");
    } else if (typeId > 8 && typeId < 13) {
      navigate("/plants");
    }
  };

  return (
    <div className="add-form">
      <h1>What did you spot and where?</h1>
      <h3>
        Please check the lists of animals and plants to make sure it hasn't
        already been added...
      </h3>
      <form className="add-inputs">
        <div className="add-heading">
          <label>Have you seen a plant or an animal? </label>
          <select
            name="category"
            id="category"
            onChange={handleCategoryChange}
            value={isAnimal}
          >
            <option value=""></option>
            <option value="animal">Animal</option>
            <option value="plant">Plant</option>
          </select>
        </div>
        {/* {isAnimal === "" && (
          <div>
            <label>Select the type of _______ seen:</label>
            <select
              name="animalType"
              id="animalType"
              onChange={handleSelectedAnimalType}
              value={selectedAnimalType}
            >
              <option value=""></option>
            </select>
          </div>
        )} */}
        {isAnimal === "plant" && (
          <div className="add-row">
            <label>Type of plant: </label>
            <select
              name="animalType"
              id="animalType"
              onChange={handleSelectedAnimalType}
              value={selectedAnimalType}
            >
              <option value=""></option>
              <option value="tree">Tree</option>
              <option value="berry">Berry</option>
              <option value="flower">Flower</option>
              <option value="other-plant">Other</option>
            </select>
          </div>
        )}
        {isAnimal === "animal" && (
          <div className="add-row">
            <label>Type of animal: </label>
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
              <option value="other-animal">Other</option>
            </select>
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-row">
            <label>Animal name: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        )}

        {isAnimal === "plant" && (
          <div className="add-row">
            <label>Plant name: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-row">
            <label>Image: </label>
            <input
              type="file"
              // name="image"
              // value={image}
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        )}

        {isAnimal === "plant" && (
          <div className="add-row">
            <label>Image: </label>
            <input
              type="file"
              // name="image"
              // value={image}
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-row">
            <label>{`Estimated Danger Level (1-5)`}:</label>
            <input
              type="text"
              name="danger"
              value={danger}
              onChange={handleDangerChange}
              className="danger-input"
            />
          </div>
        )}
        {isAnimal === "plant" && (
          <div className="add-row">
            <label>{`Edible`}:</label>
            <input
              type="text"
              name="edible"
              value={edible}
              onChange={handleEdibleChange}
              className="danger-input"
            />
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-row">
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        )}

        {isAnimal === "plant" && (
          <div className="add-row">
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-row">
            <label>Native to: </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        )}

        {isAnimal === "plant" && (
          <div className="add-row">
            <label>Native to: </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
        )}

        {isAnimal === "animal" && (
          <div className="add-submit">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        {isAnimal === "plant" && (
          <div className="add-submit">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        <div>
          {isAnimal === "" && <label>Specimen name: </label>}
          {isAnimal === "animal" && <label>Animal name: </label>}
          {isAnimal === "plant" && <label>Plant name: </label>}
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Image: </label>
          <input
            type="file"
            // name="image"
            // value={image}
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <div>
          {isAnimal === "animal" && (
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
          )}
          {isAnimal === "plant" && (
            <div>
              <label>{`Edible`}:</label>
              <input
                type="text"
                name="edible"
                value={edible}
                onChange={handleEdibleChange}
                className="danger-input"
              />
            </div>
          )}
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label>Native to: </label>
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
