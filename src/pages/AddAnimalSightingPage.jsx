import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import sightingService from "../../services/sighting-services";
import { jwtDecode } from "jwt-decode";
import { getAnimal } from "../../lib";
import "react-datepicker/dist/react-datepicker.css";
import "../css/AddAnimalSightingPage.css";

export default function AddAnimalSighting({ animals, AddAnimalSighting }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
    setLocation(selectedOption);
  };

  useEffect(() => {
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
  console.log(decodedToken);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !location) {
      // Make sure location is selected
      alert("All fields are mandatory");
      return;
    }

    const requestBody = {
      username,
      userId,
      specimenId,
      description,
      location: location.value, // No need to map or convert to an array
      image: imageUrl,
    };

    sightingService
      .createSighting(requestBody)
      .then((response) => {
        setDescription("");
        setLocation(null); // Reset to an empty string
        setImageUrl("");
        navigate("/animals");
      })
      .catch((error) => console.log(error));
  };

  const foundSpecimen = animals.find((animal) => animal._id === specimenId);

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
    { value: "Aveiro", label: "Aveiro" },
    { value: "Beja", label: "Beja" },
    { value: "Braga", label: "Braga" },
    { value: "Bragança", label: "Bragança" },
    { value: "Castelo Branco", label: "Castelo Branco" },
    { value: "Coimbra", label: "Coimbra" },
    { value: "Évora", label: "Évora" },
    { value: "Faro", label: "Faro" },
    { value: "Guarda", label: "Guarda" },
    { value: "Leiria", label: "Leiria" },
    { value: "Lisboa", label: "Lisboa" },
    { value: "Porto", label: "Porto" },
    { value: "Portalegre", label: "Portalegre" },
    { value: "Santarém", label: "Santarém" },
    { value: "Setúbal", label: "Setúbal" },
    { value: "Viana do Castelo", label: "Viana do Castelo" },
    { value: "Vila Real", label: "Vila Real" },
    { value: "Viseu", label: "Viseu" },
  ];

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
            options={locationOptions}
            className="basic-select"
            placeholder="Type or scroll to select..."
            onChange={handleLocationChange}
            value={location}
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
