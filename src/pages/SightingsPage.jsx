import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimal } from "../../lib";
import "../css/SightingsPage.css";

export default function Sightings() {
  const [foundAnimal, setFoundAnimal] = useState();
  const { specimenId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAnimal(specimenId).then((data) => setFoundAnimal(data));
    setSpecimenTheme();
  }, [specimenId]);

  function setSpecimenTheme() {
    if (foundAnimal?.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }
    return () => {
      document.body.classList.remove("other-theme");
    };
  }

  const handleNavigate = () => {
    navigate(`/animals/${specimenId}`);
  };

  return (
    <>
      <div className="spottingWrapper">
        <h2>Sightings:</h2>
        {foundAnimal?.sightings?.map((sighting) => {
          const formattedDate = new Date(sighting?.date).toString();
          return (
            <div className="sighting-cards" key={sighting._id}>
              <ul className="card-content" style={{ listStyleType: "none" }}>
                {sighting.image && sighting.image.trim() !== "" && (
                  <img
                    src={sighting.image}
                    alt="image of sighting"
                    width="50%"
                    height="50%"
                  />
                )}

                <li>
                  <b>
                    Spotted in:{" "}
                    {sighting?.placeOfInterest?.name ? (
                      <span>{sighting?.placeOfInterest?.name}, </span>
                    ) : null}{" "}
                    {sighting?.district?.name ? (
                      <span>{sighting?.district?.name}, </span>
                    ) : null}
                    {sighting.country.name}
                  </b>
                </li>
                <li>{formattedDate}</li>
                <li>
                  <b>Comment:</b> <br />
                  {sighting.description}
                </li>
                <li>
                  <b>Spotted by: </b>
                  {sighting.username}
                </li>
                <br />
                <br />
              </ul>
            </div>
          );
        })}
        <button onClick={handleNavigate}>{`Back to Details Page`}</button>
      </div>
    </>
  );
}
