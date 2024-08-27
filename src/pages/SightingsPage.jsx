import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimal } from "../../lib";

export default function Sightings({ sightings, getAnimalsWithSightings }) {
  const [sights, setSights] = useState();
  const [foundAnimal, setFoundAnimal] = useState();
  const { animalId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/animal-list/${animalId}`);
  };

  const filteredSightings = sightings.filter(
    (sight) => Number(sight.animalId) === Number(animalId)
  );

  useEffect(() => {
    getAnimalsWithSightings().then((data) => setSights(data));
  }, []);

  useEffect(() => {
    getAnimal(animalId).then((data) => setFoundAnimal(data));
  }, [animalId]);

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

        {filteredSightings.map((sighting) => {
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
