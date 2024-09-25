import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import sightingService from "../../services/sighting-services";
import { jwtDecode } from "jwt-decode";
import { getAnimal } from "../../lib";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../css/AddAnimalSightingPage.css";
import { set } from "react-hook-form";

export default function AddAnimalSighting({ animals, AddAnimalSighting }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [foundAnimal, setFoundAnimal] = useState();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [placesOfInterest, setPlacesOfInterest] = useState([]);
  const [selectedPlaceOfInterest, setSelectedPlaceOfInterest] = useState();

  //Retrieving the user's authToken token from the localStorage
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const username = decodedToken ? decodedToken.username : null; // Extract username
  const { specimenId } = useParams();

  const navigate = useNavigate();

  useEffect(
    () => {
      getCountries();
      /*   getDistricts(); */
      getAnimal(specimenId).then((data) => setFoundAnimal(data));
      if (foundAnimal?.typeId === 8) {
        document.body.classList.add("other-theme");
      } else {
        document.body.classList.remove("other-theme");
      }

      // Clean up when the component is unmounted or `foundAnimal` changes
      return () => {
        document.body.classList.remove("other-theme");
      };
    },
    [
      /* foundAnimal, specimenId */
    ]
  );

  //getting countries, mapping over them, and creating value and label to populate input options
  const getCountries = async () => {
    axios.get("http://localhost:5005/api/countries").then((response) => {
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

  const getDistricts = async () => {
    axios.get("http://localhost:5005/api/districts").then((response) => {
      const districtOptions = response.data.map((district) => {
        return { value: district._id, label: district.name };
      });
      setDistricts(districtOptions);
    });
  };

  const getPlacesOfInterest = async () => {
    axios
      .get("http://localhost:5005/api/places-of-interest")
      .then((response) => {
        const placeOfInterestOptions = response.data.map((placeOfInterest) => {
          return { value: placeOfInterest._id, label: placeOfInterest.name };
        });
        setPlacesOfInterest(placeOfInterestOptions);
      });
  };

  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]); // Append the file with the key "imageUrl"

    sightingService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("response is: ", response);

        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e);
    setDistricts(e.districts);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e);
  };

  const handlePlaceOfInterestChange = (e) => {
    setSelectedPlaceOfInterest(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !selectedCountry) {
      // Make sure location is selected
      alert("All fields are mandatory");
      return;
    }
    const requestBody = {
      username,
      userId,
      specimenId,
      description,
      country: selectedCountry.value,
      district: selectedDistrict.value,
      placeOfInterest: selectedPlaceOfInterest.value,
      image: imageUrl,
    };

    sightingService
      .createSighting(requestBody)
      .then((response) => {
        setDescription("");
        setImageUrl("");
        /* navigate("/animals"); */
        console.log("created sighting", response.data);
      })
      .catch((error) => console.log(error));
  };

  const foundSpecimen = animals.find((animal) => animal._id === specimenId);

  const selectedCountryDistricts = selectedCountry?.districts.map(
    (district) => {
      return {
        value: district._id,
        label: district.name,
        placesOfInterest: district.placesOfInterest,
      };
    }
  );

  /*   console.log("selectedCountryDistricts", selectedCountryDistricts); */

  const selectedDistrictPlacesOfInterest =
    selectedDistrict?.placesOfInterest.map((placeOfInterest) => {
      return {
        value: placeOfInterest._id,
        label: placeOfInterest.name,
      };
    });

  return (
    <div className="sighting-form">
      {foundSpecimen && (
        <h1>Where and when did you spot {foundSpecimen.name}?</h1>
      )}
      <form className="sighting-inputs">
        <div className="sighting-row">
          <label>Country:</label>

          <Select
            name="country"
            options={countries}
            className="basic-select"
            placeholder="Type or scroll to select..."
            onChange={handleCountryChange}
            value={selectedCountry}
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
        <div>
          <label>District:</label>

          <Select
            name="district"
            options={selectedCountryDistricts}
            className="basic-select"
            placeholder="Type or scroll to select..."
            onChange={handleDistrictChange}
            value={selectedDistrict}
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
        <div>
          <label>Place of Interest:</label>
          <Select
            name="place-of-interest"
            options={selectedDistrictPlacesOfInterest}
            className="basic-select"
            placeholder="Type or scroll to select..."
            onChange={handlePlaceOfInterestChange}
            value={selectedPlaceOfInterest}
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
        <div className="sighting-row">
          <label>Date:</label>
          <DatePicker selected={date} onChange={handleDateChange} />
        </div>
        <div className="sighting-row">
          <label>Comment:</label>
          <textarea
            rows="2"
            cols="40"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="sighting-row">
          <label>{`Picture of sighting (optional):`}</label>
          <input
            className="img-input"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <div className="sighting-submit">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
