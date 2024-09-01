import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfilePage() {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUserInformation();
  }, []);

  //GET all of the user information
  const getUserInformation = async () => {
    axios
      .get(`http://localhost:5005/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <h2>Welcome {user.username}</h2>
        <p>You have added {user.sightings.length} sightings</p>
      </div>
    </>
  );
}
