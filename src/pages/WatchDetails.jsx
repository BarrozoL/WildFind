import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWatch } from "../../lib";

function WatchDetails() {
  const [foundWatch, setFoundWatch] = useState(null);
  const { watchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getWatch(watchId)
      .then((data) => {
        console.log("Fetched watch:", data);
        setFoundWatch(data);
      })
      .catch((error) => console.error("Error fetching watch:", error));
  }, [watchId]);

  useEffect(() => {
    if (foundWatch && foundWatch.typeId === 8) {
      document.body.classList.add("other-theme");
    } else {
      document.body.classList.remove("other-theme");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("other-theme");
    };
  }, [foundWatch]);

  const handleNavigate = () => {
    navigate("/watch");
  };

  const handleEditNavigate = () => {
    navigate(`/watch/${watchId}/edit-watch`);
  };

  if (!foundWatch) return <p>Loading...</p>;

  console.log(
    foundWatch ? `location: ${foundWatch.location}` : "foundWatch is null"
  );
  console.log(
    foundWatch ? `dangerLevel: ${foundWatch.dangerLevel}` : "foundWatch is null"
  );
  console.log(
    foundWatch ? `description: ${foundWatch.description}` : "foundWatch is null"
  );

  return (
    <div className="animalDetailWrapper">
      <div key={foundWatch.id}>
        <h3>{foundWatch.name}</h3>
        <img src={foundWatch.image} alt={foundWatch.name} width="300px" />
        <p>Danger Level: {foundWatch.dangerLevel}</p>
        <p>{foundWatch.description}</p>
        <p>Native to {foundWatch.location}</p>
        <div className="button-details-watch">
          <button className="watch-detail-button" onClick={handleEditNavigate}>
            Edit
          </button>
          <button className="watch-detail-button" onClick={handleNavigate}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchDetails;

/*
note:
.location is printing danger level, .dangerLevel is printing description, and .description is printing location. 
Also .description prints "native to ..." so if I do <p>Native to: {foundWatch.description}</p> it returns Native to: Native to ...
I noticed in AnimalCard.jsx it was exporting `Native to ${foundAnimal.location}, but I fixed this and still have this issue
I have been trying to fix it and I am tired and stuck.
Will go back to fix. 
*/
