import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import sightingService from "../../services/sighting-services";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
export default function AddAnimalSighting({ animals, AddAnimalSighting }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const { specimenId } = useParams();
  /*  const animalNumber = Number(animalId) - 1; */
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description) {
      alert("All fields are mandatory");
      return;
    }
    /*    const typeId = animals[animalNumber]?.typeId; */

    const requestBody = { specimenId, description, location, image };

    sightingService
      .createSighting(requestBody)
      .then((response) => {
        setDescription("");
        setLocation("");
        setImage("");
        navigate("/specimens");
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
        <div>
          <label>Location:</label>
          <select
            value={location}
            name="location"
            onChange={handleLocationChange}
          >
            <option value="">Select a location</option>
            <option value="Aveiro">Aveiro</option>
            <option value="Beja">Beja</option>
            <option value="Braga">Braga</option>
            <option value="Bragança">Bragança</option>
            <option value="Castelo Branco">Castelo Branco</option>
            <option value="Coimbra">Coimbra</option>
            <option value="Évora">Évora</option>
            <option value="Faro">Faro</option>
            <option value="Guarda">Guarda</option>
            <option value="Leiria">Leiria</option>
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Portalegre">Portalegre</option>
            <option value="Santarém">Santarém</option>
            <option value="Setúbal">Setúbal</option>
            <option value="Viana do Castelo">Viana do Castelo</option>
            <option value="Vila Real">Vila Real</option>
            <option value="Viseu">Viseu</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <DatePicker selected={date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label>{`Picture of sighting (optional):`}</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleImageChange}
            className="sighting-img"
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