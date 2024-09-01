import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PersonalWatchlistPage() {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    getUserWatchlist();
  }, []);

  const getUserWatchlist = async () => {
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
        <h1>Welcome {user.name}</h1>
        <h3>This is your current watchlist</h3>
        {user.watchList && user.watchList ? (
          user.watchList.map((watchItem) => (
            <div key={watchItem._id}>
              <p>{watchItem.name}</p>

              <p>Location: {watchItem.location}</p>
              <p>Sightings: {watchItem.sightings.length}</p>
            </div>
          ))
        ) : (
          <p>Your watchlist is empy</p>
        )}
        {/*   <p>{user.watchList}</p>
        {console.log("watch:", user.watchList)}
        <p></p> */}
      </div>
    </>
  );
}
