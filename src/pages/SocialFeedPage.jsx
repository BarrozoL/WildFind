import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function SocialFeedPage() {
  const [sightings, setSightings] = useState();

  useEffect(() => {
    getActions();
  }, []);

  const getActions = async () => {
    axios
      .get("http://localhost:5005/api/actions")
      .then((response) => {
        setSightings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  if (!sightings) return <p>Loading...</p>;

  return (
    <>
      <div>
        {sightings.map((action) => {
          return (
            <div style={{ border: "1px solid black" }} key={action._id}>
              {console.log("action:", action.sighting?.specimenId?.name)}
              <h3>
                {action?.user?.username} Has spotted{" "}
                {action?.sighting?.specimenId?.name} in{" "}
                {action?.sighting?.location}
              </h3>
              <h4>Sighting description: {action?.sighting?.description}</h4>
              <p>Entry added at: {action?.sighting?.date}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
