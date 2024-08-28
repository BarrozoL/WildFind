import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimal } from "../../lib";
import axios from "axios";

export default function Sightings({ sightings, getAnimalsWithSightings }) {
  const [sights, setSights] = useState([]);
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimenId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/specimens/${specimenId}`);
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

  const filteredSightings = sightings.filter(
    (sight) => Number(sight.specimenId) === Number(specimenId)
  );

  /* useEffect(() => {
    getAnimalsWithSightings(specimenId).then((data) => setSights(data));
  }, []); */

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
        {console.log("sights:", sights, "setSights:", setSights)}
        {console.log(sightings)}
        {sights.map((sighting) => {
          const formattedDate = new Date(sighting.date).toString();
          console.log(filteredSightings);
          return (
            <div>
              <ul
                key={sighting.id}
                style={{ listStyleType: "none" }}
                className="sighting-cards"
              >
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
