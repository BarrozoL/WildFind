import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditAnimalPage.css";
import Select from "react-select";
import axios from "axios";
import { editAnimal, getAnimal } from "../../lib";
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
function EditAnimalPage() {
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimenId } = useParams();
  const navigate = useNavigate();
  const [isAnimal, setIsAnimal] = useState("");
  const [name, setName] = useState("");
  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [dangerLevel, setDangerLevel] = useState("");
  const [edible, setEdible] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  let typeId;

  useEffect(() => {
    getCountries();
    if (specimenId) {
      getAnimal(specimenId).then((data) => setFoundAnimal(data));
    }
  }, [specimenId]);

  useEffect(() => {
    if (foundAnimal) {
      setIsAnimal(foundAnimal.typeId <= 8 ? "animal" : "plant");
      setName(foundAnimal.name);
      setSelectedAnimalType(animalTypeToName(foundAnimal.typeId));
      setImageUrl(foundAnimal.image);
      setDescription(foundAnimal.description);
      setDangerLevel(foundAnimal.dangerLevel);
      setEdible(foundAnimal.edible);

      //finding the country option that matches the country of the found animal
      const countryOption = countries.find((foundCountry) => {
        return foundCountry.value === foundAnimal.country[0]._id;
      });
      if (countryOption) {
        setSelectedCountry(countryOption);
      }
    }
  }, [foundAnimal, countries]);

  //getting countries, mapping over them, and creating value and label to populate input options
  const getCountries = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/countries`)
      .then((response) => {
        const countryOptions = response.data.map((country) => {
          return {
            value: country._id,
            label: country.name,
            districts: country.districts,
          };
        });
        setCountries(countryOptions);
      });
  };

  const animalTypeToName = (typeId) => {
    const typeMap = {
      1: "bird",
      2: "mammal",
      3: "reptile",
      4: "insect",
      5: "amphibian",
      6: "aquatic",
      7: "pet",
      8: "other-animal",
      9: "tree",
      10: "berry",
      11: "flower",
      12: "other-plant",
    };
    return typeMap[typeId] || "";
  };
  const nameToAnimalType = (typeName) => {
    const typeMap = {
      bird: 1,
      mammal: 2,
      reptile: 3,
      insect: 4,
      amphibian: 5,
      aquatic: 6,
      pet: 7,
      "other-animal": 8,
      tree: 9,
      berry: 10,
      flower: 11,
      "other-plant": 12,
    };
    return typeMap[typeName] || null;
  };
  if (!foundAnimal) return <p>Loading...</p>;
  const handleNameChange = (e) => setName(e.target.value);
  const handleTypeChange = (e) => setSelectedAnimalType(e.target.value);
  const handleCategoryChange = (e) => setIsAnimal(e.target.value);
  const handleDangerLevelChange = (e) => setDangerLevel(e.target.value);
  const handleEdibleChange = (e) => setEdible(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCountryChange = (e) => setSelectedCountry(e);
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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    typeId = nameToAnimalType(selectedAnimalType);
    const defaultImageMap = {
      1: defaultBirdImage,
      2: defaultMammalImage,
      3: defaultReptileImage,
      4: defaultInsectImage,
      5: defaultAmphibianImage,
      6: defaultAquaticImage,
      7: defaultPetImage,
      8: defaultOtherImage,
      9: defaultTreeImage,
      10: defaultBerryImage,
      11: defaultFlowerImage,
      12: defaultPlantImage,
    };
    const updatedAnimal = {
      ...foundAnimal,
      name,
      typeId,
      image: imageUrl || defaultImageMap[typeId],
      description,
      country: selectedCountry?.value,
      dangerLevel: isAnimal === "animal" ? dangerLevel : undefined,
      edible: isAnimal === "plant" ? edible : undefined,
    };
    editAnimal(specimenId, updatedAnimal)
      .then(() => {
        if (typeId <= 8) {
          navigate("/animals");
        } else if (typeId > 8 && typeId < 13) {
          navigate("/plants");
        }
      })
      .catch((error) => {
        console.error("Error updating animal:", error);
        // Optionally, set an error state to display to the user
      });
  };

  return (
    <div className="edit-form">
      <div key={foundAnimal._id}>
        <h3>
          Edit
          {(foundAnimal?.typeId <= 8 && "Animal") ||
            (foundAnimal?.typeId > 8 && foundAnimal?.typeId < 13 && "Plant")}
        </h3>
        <div>
          <label>Plant or Animal?</label>
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
        <form onSubmit={handleFormSubmit} className="edit-inputs">
          <div>
            <label>
              {isAnimal === "animal" ? "Animal name: " : "Plant name: "}
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label>
              {isAnimal === "animal"
                ? "Select the type of animal seen: "
                : "Select the type of plant seen: "}
            </label>
            <select
              name="animalType"
              id="animalType"
              onChange={handleTypeChange}
              value={selectedAnimalType}
              required
            >
              <option value=""></option>
              {isAnimal === "animal" ? (
                <>
                  <option value="bird">Bird</option>
                  <option value="mammal">Mammal</option>
                  <option value="reptile">Reptile</option>
                  <option value="insect">Insect</option>
                  <option value="amphibian">Amphibian</option>
                  <option value="aquatic">Aquatic Animal</option>
                  <option value="pet">Pet</option>
                  <option value="other-animal">Other</option>
                </>
              ) : (
                <>
                  <option value="tree">Tree</option>
                  <option value="berry">Berry</option>
                  <option value="flower">Flower</option>
                  <option value="other-plant">Other</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label>Image: </label>
            <input type="file" onChange={handleFileUpload} />
          </div>
          {isAnimal === "animal" ? (
            <div>
              <label>Estimated Danger Level (1-5): </label>
              <input
                type="number"
                name="danger"
                value={dangerLevel}
                onChange={handleDangerLevelChange}
                min="1"
                max="5"
                required
              />
            </div>
          ) : (
            <div>
              <label>Edible: </label>
              <input
                type="text"
                name="edible"
                value={edible}
                onChange={handleEdibleChange}
                required
              />
            </div>
          )}
          <div>
            <label>Description: </label>
            <textarea
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="sighting-row">
            <label>Country:</label>

            <Select
              name="country"
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              className="basic-select"
              placeholder="Type or scroll to select..."
              styles={{
                control: (base) => ({
                  ...base,
                  height: "50px", // Set the desired height of the input box
                  minHeight: "50px",
                  width: "100%",
                  minWidth: "100%",
                }),
                valueContainer: (base) => ({
                  ...base,
                  height: "50px", // Ensure the text stays vertically aligned
                  padding: "0 8px", // Adjust padding inside the container if needed
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
              }}
            />
          </div>
          <div className="edit-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditAnimalPage;
