import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";
import "../css/AddAnimalPage.css";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import axios from "axios";

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

  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [name, setName] = useState("");
  const [dangerNumber, setDangerNumber] = useState("");
  const [edible, setEdible] = useState("");
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAnimal, setIsAnimal] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getCountries();
    getAllAnimals()
      .then((data) => {
        // Filter data to include only those with typeId <= 8
        const filteredData = data.filter((animal) => animal.typeId <= 8);
        setAnimals(filteredData);
      })
      .catch((error) => console.error("Error fetching animals:", error));
  }, []);

  //getting countries, mapping over them, and creating value and label to populate input options
  const getCountries = async () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/countries`).then((response) => {
      const countryOptions = response.data.map((country) => {
        return { value: country._id, label: country.name };
      });
      setCountries(countryOptions);
    });
  };

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

  const handleDangerChange = (e) => {
    setDangerNumber(e.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleEdibleChange = (e) => {
    setEdible(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e);
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

    let danger = dangerNumber.concat(" ", "(", comment, ")");

    const requestBody = {
      username,
      userId,
      name,
      typeId,
      description,
      country: country[0].value,
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
        setCountries("");
        setDangerNumber("");
        setComment("");
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
    <div className="page">
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
                <option value="berry">Fruit</option>
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
                className="img"
                type="file"
                // name="image"
                // value={image}
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
          )}

          {isAnimal === "animal" && (
            <div className="add-row">
              <label htmlFor="dangerNumber">
                Estimated Danger Level (0-5) - optional
              </label>
              <select
                name="dangerNumber"
                id="dangerNumber"
                onChange={handleDangerChange}
                value={dangerNumber}
                className="danger-input"
              >
                <option value="">Select a level</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <div className="comment-section">
                <label htmlFor="comment">Comment:</label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="about danger-level..."
                  value={comment}
                  onChange={handleCommentChange}
                  className="comment-input"
                />
              </div>
            </div>
          )}

          {isAnimal === "plant" && (
            <div className="add-row">
              <label>Edible:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="edible"
                    value="yes"
                    checked={edible === "yes"}
                    onChange={handleEdibleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="edible"
                    value="no"
                    checked={edible === "no"}
                    onChange={handleEdibleChange}
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="edible"
                    value="unknown"
                    checked={edible === "unknown"}
                    onChange={handleEdibleChange}
                  />
                  Unknown
                </label>
              </div>
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
              <Select
                isMulti
                name="countries"
                options={countries}
                /*  styles={{
                  control: (base) => ({
                    ...base,
                    height: "40px", // Set the desired height of the input box
                    minHeight: "30px",
                    width: "100%",
                    minWidth: "100%",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: "10px !important",
                    width: "30vw", // Ensure the text stays vertically aligned
                    padding: "0 8px", // Adjust padding inside the container if needed
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    alignItems: "center",
                    flexWrap: "nowrap",
                    padding: "0 5px",
                    maxWidth: "none",
                  }),
                  input: (provided) => ({
                    ...provided,
                    width: "100%",
                    paddingLeft: "5px",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: "0", // Prevent input text from shifting vertically
                    padding: "0",
                    width: "100%",
                    minWidth: "20vw",
                    flex: "1 1 auto",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "0", // Adjust padding around the dropdown arrow
                    height: "40px", // Adjust the height of the dropdown arrow to fit the box
                    width: "40px", // Adjust width of the dropdown arrow if needed
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: "auto", // Dropdown list max height
                  }),
                }} */
                menuPlacement="auto"
                className="basic-multi-select"
                classNamePrefix="custom"
                placeholder="Type or scroll to select..."
                onChange={handleCountryChange}
                value={country}
              />
            </div>
          )}

          {isAnimal === "plant" && (
            <div className="add-row">
              <label>Native to: </label>
              <Select
                isMulti
                name="countries"
                options={countries}
                /* styles={{
                  control: (base) => ({
                    ...base,
                    height: "40px", // Set the desired height of the input box
                    minHeight: "30px",
                    width: "100%",
                    minWidth: "100%",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: "10px", // Ensure the text stays vertically aligned
                    padding: "0 8px", // Adjust padding inside the container if needed
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    alignItems: "center",
                    flexWrap: "nowrap",
                    padding: "0 5px",
                    maxWidth: "none",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    fontSize: "20px",
                    padding: 0,
                    margin: 0,
                    maxHeight: "20px",
                    maxWidth: "30px",
                    overflow: "hidden",
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    fontSize: "16px", // Adjust the font size of the selected text
                  }),
                  input: (provided) => ({
                    ...provided,
                    width: "100%",
                    paddingLeft: "5px",
                    fontSize: "12px",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: "0", // Prevent input text from shifting vertically
                    padding: "0",
                    width: "100%",
                    minWidth: "20vw",
                    flex: "1 1 auto",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: "0", // Adjust padding around the dropdown arrow
                    height: "40px", // Adjust the height of the dropdown arrow to fit the box
                    width: "40px", // Adjust width of the dropdown arrow if needed
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: "auto", // Dropdown list max height
                  }),
                }} */
                menuPlacement="auto"
                className="basic-multi-select"
                classNamePrefix="custom"
                placeholder="Type or scroll to select..."
                onChange={handleCountryChange}
                value={country}
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
        </form>
      </div>
    </div>
  );
}
