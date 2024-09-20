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

export default function AddAnimalSighting({ animals, AddAnimalSighting }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { specimenId } = useParams();
  //Retrieving the user's authToken token from the localStorage
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken._id : null; // Extract userId
  const username = decodedToken ? decodedToken.username : null; // Extract username

  const navigate = useNavigate();

  const [foundAnimal, setFoundAnimal] = useState();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  useEffect(() => {
    getLocations();
    /*  .then((response) => {
        const locationOptions = response.map((location) => ({
          value: location._id,
          label: location.name,
        }));
       
      })
      .catch((err) => console.log(err)); */
    getAnimal(specimenId).then((data) => setFoundAnimal(data));
  }, [specimenId]);

  useEffect(() => {
    if (foundAnimal?.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    // Clean up when the component is unmounted or `foundAnimal` changes
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundAnimal]);

  // const handleImageChange = (e) => {
  //   setImage(e.target.value);
  // };

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

  //get all of the existing locations
  const getLocations = async () => {
    axios
      .get("http://localhost:5005/api/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !selectedLocation?.value) {
      // Make sure location is selected
      alert("All fields are mandatory");
      return;
    }

    const requestBody = {
      username,
      userId,
      specimenId,
      description,
      // this needs to be location because. for unkown reason it only works like this
      // eventhough the backend request asks for a locationId, not location
      location: selectedLocation?.value,
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

  return (
    <div className="sighting-form">
      {foundSpecimen && (
        <h1>Where and when did you spot {foundSpecimen.name}?</h1>
      )}
      <form className="sighting-inputs">
        <div className="sighting-row">
          <label>Location:</label>

          <Select
            name="location"
            options={locations.map((location) => ({
              value: location._id,
              label: location.name,
            }))}
            className="basic-select"
            placeholder="Type or scroll to select..."
            onChange={handleLocationChange}
            value={selectedLocation}
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
