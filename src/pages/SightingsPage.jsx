import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimal } from "../../lib";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../css/SightingsPage.css";

export default function Sightings({ sightings, getAnimalsWithSightings }) {
  const [sights, setSights] = useState([]);
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimenId } = useParams();
  //Retrieving the user's authToken token from the localStorage
  const token = localStorage.getItem("authToken");
  //Running jwtDecode function to decode the user's authToken
  const decodedToken = token ? jwtDecode(token) : null;
  const username = decodedToken ? decodedToken.name : null; // Extract username
  const userId = decodedToken ? decodedToken._id : null; // Extract username

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/animals/${specimenId}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/specimens/${specimenId}/sightings`)
      .then((response) => {
        setSights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  }, []);

  useEffect(() => {
    getAnimal(specimenId).then((data) => setFoundAnimal(data));
  }, [specimenId]);

  useEffect(() => {
    if (foundAnimal?.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundAnimal]);

  return (
    <>
      <div className="spottingWrapper">
        <h2>Sightings:</h2>
        {sights.map((sighting) => {
          const formattedDate = new Date(sighting.date).toString();
          return (
            <div key={sighting._id}>
              {console.log(sighting)}
              <ul style={{ listStyleType: "none" }} className="sighting-cards">
                {sighting.image && sighting.image.trim() !== "" && (
                  <img
                    src={sighting.image}
                    alt="image of sighting"
                    width="40%"
                    height="40%"
                  />
                )}
                <li>
                  <b>Sighting Location:</b> {sighting.location}
                </li>
                <li>{formattedDate}</li>
                <li>
                  <b>Comment:</b> <br />
                  {sighting.description}
                </li>
                <li>Animal spotted by: {sighting.username}</li>
                <br />
                <br />
              </ul>
            </div>
          );
        })}
        <button onClick={handleNavigate}>{`Back to Animal Details`}</button>
      </div>
    </>
  );
}
