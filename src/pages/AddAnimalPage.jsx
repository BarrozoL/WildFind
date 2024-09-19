import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../lib";
import "../css/AddAnimalPage.css";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";

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
  const [dangerNumber, setDangerNumber] = useState("");
  const [edible, setEdible] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isAnimal, setIsAnimal] = useState("");
  const [comment, setComment] = useState("");

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

  const handleLocationChange = (selectedOptions) => {
    setLocations(selectedOptions || []); // Handle the selection of multiple locations
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
      location: locations.map((location) => location.value),
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
        setLocations("");
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

  const locationOptions = [
    { value: "Africa", label: "Africa" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "North America", label: "North America" },
    { value: "South America", label: "South America" },
    { value: "Australia", label: "Australia" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "North Africa", label: "North Africa" },
    { value: "Western Europe", label: "Western Europe" },
    { value: "Eastern Europe", label: "Eastern Europe" },
    { value: "Scandinavia", label: "Scandinavia" },
    { value: "Central America", label: "Central America" },
    { value: "Middle East", label: "Middle East" },
    { value: "Southeast Asia", label: "Southeast Asia" },
    { value: "East Asia", label: "East Asia" },
    { value: "South Asia", label: "South Asia" },
    { value: "Oceania", label: "Oceania" },
    { value: "Caribbean", label: "Caribbean" },
    { value: "Southern Africa", label: "Southern Africa" },
    { value: "West Africa", label: "West Africa" },
    { value: "Central Africa", label: "Central Africa" },
    { value: "East Africa", label: "East Africa" },
    { value: "Northern Europe", label: "Northern Europe" },
    { value: "Southern Europe", label: "Southern Europe" },
    { value: "Central Europe", label: "Central Europe" },
    { value: "North America", label: "North America" },
    { value: "South America", label: "South America" },
    { value: "Andorra", label: "Andorra" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Albania", label: "Albania" },
    { value: "Armenia", label: "Armenia" },
    { value: "Angola", label: "Angola" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Argentina", label: "Argentina" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Austria", label: "Austria" },
    { value: "Australia", label: "Australia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Barbados", label: "Barbados" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Belgium", label: "Belgium" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Burundi", label: "Burundi" },
    { value: "Benin", label: "Benin" },
    { value: "Saint Barthélemy", label: "Saint Barthélemy" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bonaire", label: "Bonaire" },
    { value: "Brazil", label: "Brazil" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Botswana", label: "Botswana" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belize", label: "Belize" },
    { value: "Canada", label: "Canada" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Congo (DRC)", label: "Congo (DRC)" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Congo", label: "Congo" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Côte d’Ivoire", label: "Côte d’Ivoire" },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Chile", label: "Chile" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cabo Verde", label: "Cabo Verde" },
    { value: "Curaçao", label: "Curaçao" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czechia", label: "Czechia" },
    { value: "Germany", label: "Germany" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Denmark", label: "Denmark" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Algeria", label: "Algeria" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Estonia", label: "Estonia" },
    { value: "Egypt", label: "Egypt" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Spain", label: "Spain" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Finland", label: "Finland" },
    { value: "Fiji", label: "Fiji" },
    { value: "Falkland Islands", label: "Falkland Islands" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Grenada", label: "Grenada" },
    { value: "Georgia", label: "Georgia" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "Guernsey", label: "Guernsey" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greenland", label: "Greenland" },
    { value: "Gambia", label: "Gambia" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Greece", label: "Greece" },
    {
      value: "South Georgia and the South Sandwich Islands",
      label: "South Georgia and the South Sandwich Islands",
    },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guam", label: "Guam" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Hong Kong SAR China", label: "Hong Kong SAR China" },
    { value: "Honduras", label: "Honduras" },
    { value: "Croatia", label: "Croatia" },
    { value: "Haiti", label: "Haiti" },
    { value: "Hungary", label: "Hungary" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Isle of Man", label: "Isle of Man" },
    { value: "India", label: "India" },
    {
      value: "British Indian Ocean Territory",
      label: "British Indian Ocean Territory",
    },
    { value: "Iraq", label: "Iraq" },
    { value: "Iran", label: "Iran" },
    { value: "Iceland", label: "Iceland" },
    { value: "Italy", label: "Italy" },
    { value: "Jersey", label: "Jersey" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Jordan", label: "Jordan" },
    { value: "Japan", label: "Japan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Comoros", label: "Comoros" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "North Korea", label: "North Korea" },
    { value: "South Korea", label: "South Korea" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Laos", label: "Laos" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Liberia", label: "Liberia" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Latvia", label: "Latvia" },
    { value: "Libya", label: "Libya" },
    { value: "Morocco", label: "Morocco" },
    { value: "Monaco", label: "Monaco" },
    { value: "Moldova", label: "Moldova" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Saint Martin", label: "Saint Martin" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Mali", label: "Mali" },
    { value: "Myanmar (Burma)", label: "Myanmar (Burma)" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Macao SAR China", label: "Macao SAR China" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Malta", label: "Malta" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Maldives", label: "Maldives" },
    { value: "Malawi", label: "Malawi" },
    { value: "Mexico", label: "Mexico" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Namibia", label: "Namibia" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "Niger", label: "Niger" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Norway", label: "Norway" },
    { value: "Nepal", label: "Nepal" },
    { value: "Nauru", label: "Nauru" },
    { value: "Niue", label: "Niue" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Oman", label: "Oman" },
    { value: "Panama", label: "Panama" },
    { value: "Peru", label: "Peru" },
    { value: "French Polynesia", label: "French Polynesia" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Poland", label: "Poland" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    { value: "Pitcairn Islands", label: "Pitcairn Islands" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Palestinian Territories", label: "Palestinian Territories" },
    { value: "Portugal", label: "Portugal" },
    { value: "Palau", label: "Palau" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Qatar", label: "Qatar" },
    { value: "Réunion", label: "Réunion" },
    { value: "Romania", label: "Romania" },
    { value: "Serbia", label: "Serbia" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sudan", label: "Sudan" },
    { value: "Sweden", label: "Sweden" },
    { value: "Singapore", label: "Singapore" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "San Marino", label: "San Marino" },
    { value: "Senegal", label: "Senegal" },
    { value: "Somalia", label: "Somalia" },
    { value: "Suriname", label: "Suriname" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "São Tomé and Príncipe", label: "São Tomé and Príncipe" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Sint Maarten", label: "Sint Maarten" },
    { value: "Syria", label: "Syria" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
    { value: "Chad", label: "Chad" },
    { value: "Togo", label: "Togo" },
    { value: "Thailand", label: "Thailand" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Timor-Leste", label: "Timor-Leste" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Tonga", label: "Tonga" },
    { value: "Turkey", label: "Turkey" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "Uganda", label: "Uganda" },
    {
      value: "U.S. Minor Outlying Islands",
      label: "U.S. Minor Outlying Islands",
    },
    { value: "United States", label: "United States" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vatican City", label: "Vatican City" },
    {
      value: "Saint Vincent and the Grenadines",
      label: "Saint Vincent and the Grenadines",
    },
    { value: "Venezuela", label: "Venezuela" },
    { value: "British Virgin Islands", label: "British Virgin Islands" },
    { value: "U.S. Virgin Islands", label: "U.S. Virgin Islands" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Wallis and Futuna", label: "Wallis and Futuna" },
    { value: "Samoa", label: "Samoa" },
    { value: "Kosovo", label: "Kosovo" },
    { value: "Yemen", label: "Yemen" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "South Africa", label: "South Africa" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

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
                name="locations"
                options={locationOptions}
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
                onChange={handleLocationChange}
                value={locations}
              />
            </div>
          )}

          {isAnimal === "plant" && (
            <div className="add-row">
              <label>Native to: </label>
              <Select
                isMulti
                name="locations"
                options={locationOptions}
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
                onChange={handleLocationChange}
                value={locations}
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
